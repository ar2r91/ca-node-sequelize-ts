import {HttpResponse} from '../entities/HttpResponse';
import {HttpRequest} from '../entities/HttpRequest';

export interface ControllersGateway {
  getLogin(r: HttpRequest): Promise<HttpResponse>;
}
