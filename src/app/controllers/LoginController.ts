import {AppGateway} from '../../domain/interfaces/AppGateway';
import {HttpRequest} from '../entities/HttpRequest';
import {HttpResponse} from '../entities/HttpResponse';
import HttpStatus from 'http-status-codes';
import {LoginReportRequest} from '../../domain/use-cases/login/request';

export class LoginController {
  services: AppGateway;

  constructor(s: AppGateway) {
    this.services = s;
  }

  async post(r: HttpRequest) {
    const request: LoginReportRequest = {
      email: r.body.email,
      password: r.body.password,
    };
    const data = await this.services.requestLogin(request);
    const body = {
      status: 'Success',
      message: 'payment found',
      data,
    };
    return new HttpResponse(body, HttpStatus.ACCEPTED);
  }
}
