import {AppGateway} from '../../domain/interfaces/AppGateway';
import {ControllersGateway} from '../interfaces/ControllersGateway';
import {HttpRequest} from '../entities/HttpRequest';
import {HttpResponse} from '../entities/HttpResponse';
import {LoginController} from "./LoginController";

export class Controllers implements ControllersGateway {

  services: AppGateway;
  loginController: LoginController;

  constructor(s: AppGateway) {
    this.services = s;
    this.loginController = new LoginController(this.services);
  }

  async getLogin(r: HttpRequest): Promise<HttpResponse> {
    return await this.loginController.post(r);
  }
}
