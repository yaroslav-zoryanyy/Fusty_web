import { DataTypes } from "sequelize";

import sequelize from "./main";

const users = sequelize.define(
  "users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  },
);

export default users;
