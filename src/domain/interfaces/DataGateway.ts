import {LoginReportRequest} from "../use-cases/login/request";

export interface DataGateway {
  login(r: LoginReportRequest): Promise<any>;
}
