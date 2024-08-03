import { DataTypes, Model } from "sequelize";
import database from "../config/database";

interface UserInterface extends Model {
  id: number;
  username: string;
  password: string;
  email: string;
}

const User = database.define<UserInterface>('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 16],
      isAlphanumeric: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {}
  }
})

export default User;