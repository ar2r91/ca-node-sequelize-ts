import {LoginReportRequest} from "../use-cases/login/request";
import {LoginReportResponse} from "../use-cases/login/response";

export interface AppGateway {
  requestLogin(r: LoginReportRequest): Promise<LoginReportResponse>;
}
