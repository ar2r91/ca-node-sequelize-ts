import {HttpRequest} from './entities/HttpRequest';
import {App} from '../utils/app';

export class ExpressApp extends App {
  configure() {
    this.app.post('/login/user', (req, res) => {
      this.controllers.getLogin(new HttpRequest(req))
        .then((response) => this.handleResponse(req, res, response))
        .catch((e) => this.handleError(req, res, e));
    });
  }
}
