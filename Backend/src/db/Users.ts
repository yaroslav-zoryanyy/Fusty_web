import { DataTypes } from "sequelize";

import { sequelize} from './main';



const Users = sequelize.define(
  "Users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      phone: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: true },
      surname: { type: DataTypes.STRING, allowNull: true },
      login: { type: DataTypes.STRING, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: true },
      access_token: { type: DataTypes.STRING, allowNull: true },
      refresh_token: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: false,
    tableName: "users",
  },
);

export default Users;
