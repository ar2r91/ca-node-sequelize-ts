import {Response} from 'express-serve-static-core';

export class HttpResponse implements IHttpResponse {
  statusCode: number;
  body: any;
  headers: any;

  constructor(body: any, statusCode: number) {
    this.headers = {
      'Content-Type': 'application/json',
    };
    this.body = body;
    this.statusCode = statusCode;
  }

  send(r: Response) {
    r
      .set(this.headers)
      .status(this.statusCode)
      .send(this.body);
  }

}

interface IHttpResponse {
  body: any;
  headers: any;
  statusCode: number;
}
