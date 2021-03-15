import {Model, Optional, DataTypes} from 'sequelize'
import db from './_instance'

export interface UserAttributes {
  id: string
  names: string
  newPassword?: string
  confirmNewPassword?: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
}

const User = db.sequelize.define<UserInstance>(
  'Users',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    names: {
      type: DataTypes.STRING,
    },
    newPassword: {
      type: DataTypes.VIRTUAL,
    },
    confirmNewPassword: {
      type: DataTypes.VIRTUAL,
    },
  },
  {
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['password', 'tokenVerify'],
      },
    },
    scopes: {
      withPassword: {},
    },
  }
)

export default User
