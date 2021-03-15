import {ParamsDictionary, Request} from 'express-serve-static-core';

export class HttpRequest implements IHttpRequest {
  body: Request['body'];
  query: Request['query'];
  params: Request['params'];
  ip: Request['ip'];
  method: Request['method'];
  path: Request['path'];
  headers: Request['headers'];

  constructor(r: Request) {
    this.body = r.body;
    this.params = r.params;
    this.ip = r.ip;
    this.method = r.method;
    this.path = r.path;
    this.query = r.query;
    this.headers = {
      'Content-Type': r.get('Content-Type'),
      'Referer': r.get('Referer'),
      'User-Agent': r.get('User-Agent'),
    };
  }

}

interface IHttpRequest {
  body: any;
  params: ParamsDictionary;
}
