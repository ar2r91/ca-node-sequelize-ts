import {DataGateway} from '../../interfaces/DataGateway';
import {LoginReportRequest} from './request';
import {IncompleteRequestError} from '../../../utils/errors/types';

export class LoginReporter {
  dataGateway: DataGateway;

  constructor(dg: DataGateway) {
    this.dataGateway = dg;
  }

  async request(r: LoginReportRequest) {
    this.verifyCompleteRequest(r);
    const data = await this.dataGateway.login(r);
    return {
      user: data
    };
  }

  verifyCompleteRequest(req: LoginReportRequest) {
    if (req.email == null || req.email === '') {
      throw new IncompleteRequestError('Not a valid email');
    }
    if (req.password == null || req.password === '') {
      throw new IncompleteRequestError('Not a valid password');
    }
  }
}
