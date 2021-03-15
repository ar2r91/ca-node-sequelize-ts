import express, {Application} from 'express';
import {ControllersGateway} from '../../app/interfaces/ControllersGateway';
import HttpStatus from 'http-status-codes';
import url from 'url';
import logger from '../logger';
import {GeneralError, TechnicalError} from '../errors/types';
import bodyParser from "body-parser";

export class App {

  private package = require('../../../package.json');

  app: Application;
  controllers: ControllersGateway;

  constructor(controllers: ControllersGateway) {
    this.app = express();
    const jsonParser = bodyParser.json();
    this.app.use(jsonParser);
    this.controllers = controllers;

    // Import zipkin stuff
    const {Tracer, BatchRecorder, jsonEncoder} = require("zipkin");
    const CLSContext = require('zipkin-context-cls');
    const {HttpLogger} = require("zipkin-transport-http");

    // Import zipkin instrumentation express middleware
    const zipkinMiddleware = require("zipkin-instrumentation-express").expressMiddleware;

    const ZIPKIN_ENDPOINT = process.env.ZIPKIN_ENDPOINT || "http://localhost:9411";

    // Get ourselves a zipkin tracer
    const tracer = new Tracer({
      ctxImpl: new CLSContext(),
      //recorder: new ConsoleRecorder(),
      recorder: new BatchRecorder({
        logger: new HttpLogger({
          endpoint: `${ZIPKIN_ENDPOINT}/api/v2/spans`,
          jsonEncoder: jsonEncoder.JSON_V2,
        }),
      }),
      localServiceName: this.package.name,
      defaultTags: {version: this.package.version}, //stackoverflow.com/a/10855054/2823916
    });

    // Add zipkin express middleware
    this.app.use(zipkinMiddleware({tracer}));

    // Middleware headers
    this.app.use(function (req: any, res: any, next: any) {
      // tracer.writeIdToConsole(req.method + ' ' + req.url);

      logger.info({
        idTransaccion: tracer.id.traceId,
        action: 'Start transaction',
        event: req.method + ' ' + url.parse(req.url).pathname,
        urlService: req.url,
        responseTime: 0,
        status: 'OK',
        code: 0,
        message: {query: req.query, params: req.params, body: req.body},
      });

      // Remember variables
      req.idTransaccion = tracer.id.traceId;
      req.starttime = Date.now();

      // Remember into zipkin
      tracer.id.event = req.method + ' ' + url.parse(req.url).pathname;
      tracer.id.urlService = req.url;

      next();
    });
  }

  protected handleResponse(req: any, res: any, response: any) {
    App.handle(req, res);
    res.set('status', response.statusCode);
    res.set('code', '0');
    res.set('type', 'Success');
    res.set('message', 'OK');
    response.send(res);

    logger.info({
      idTransaccion: res.get('idTransaccion'),
      action: 'End transaction',
      event: req.method + ' ' + url.parse(req.url).pathname,
      urlService: req.url,
      responseTime: res.get('responseTime'),
      status: res.statusMessage,
      code: res.statusCode,
      message: response.body || 'Success Response',   // response.body.message
    });
  }

  protected handleError(req: any, res: any, e: any) {
    App.handle(req, res);
    if (!(e instanceof GeneralError)) {
      e = new TechnicalError(e);
    }
    e.path = req.method + ' ' + req.url;
    res.set('status', e.statusCode);
    res.set('code', e.code);
    res.set('type', e.name);
    res.set('message', e.message);
    res.status(e instanceof GeneralError ? e.statusCode : HttpStatus.INTERNAL_SERVER_ERROR).json(e);

    logger.error({
      idTransaccion: res.get('idTransaccion'),
      action: 'End transaction',
      event: req.method + ' ' + req.url,
      urlService: req.url,
      responseTime: res.get('responseTime'),
      status: e.statusCode,
      code: e.code + ': ' + e.name,
      message: e,
    });
  }

  private static handle(req: any, res: any) {
    // Header response
    res.set('X-Correlation-Id', req.idTransaccion);
    res.set('idTransaccion', req.idTransaccion);
    res.set('datetime', new Date().toString());
    res.set('responseTime', Date.now() - req.starttime);
  }

}
