import User from "../entities/User";

export class UserRepository {

  async getAll(): Promise<any> {
    return User.findAll();
  }

  // Private

  /*async _getById(id: number) {
    try {
      let user = await this.userEntity.findOne({where: {id: id}}, {rejectOnEmpty: true});

      if (user === null) {
        return this._errorNotFound(id);
      }

      return user;
    } catch (error) {
      return this._errorNotFound(id);
    }
  }

  _errorNotFound(id: number) {
    const notFoundError = new Error('NotFoundError');
    notFoundError.details = `User with id ${id} can't be found.`;
    throw notFoundError;
  }*/
}
