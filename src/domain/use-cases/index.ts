import {DataGateway} from '../interfaces/DataGateway';
import {AppGateway} from '../interfaces/AppGateway';
import {LoginReporter} from './login/reporter';
import {LoginReportResponse} from "./login/response";
import {LoginReportRequest} from "./login/request";

export class Services implements AppGateway {

  dataGateway: DataGateway;
  loginReporter: LoginReporter;

  constructor(dg: DataGateway) {
    this.dataGateway = dg;
    this.loginReporter = new LoginReporter(this.dataGateway);
  }

  async requestLogin(r: LoginReportRequest): Promise<LoginReportResponse> {
    return await this.loginReporter.request(r);
  }
}
