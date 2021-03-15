import {DataGateway} from '../../domain/interfaces/DataGateway';
import {UserRepository} from "./UserRepository";
import {LoginReportRequest} from "../../domain/use-cases/login/request";

export class Repositories implements DataGateway {

  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(r: LoginReportRequest): Promise<any> {
    return await this.userRepository.getAll();
  }
}
