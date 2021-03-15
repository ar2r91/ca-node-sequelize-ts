const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: (user: any) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(user.password, salt);
  },
  comparePasswords: (password: string, hash: string) => bcrypt.compareSync(password, hash)
};
