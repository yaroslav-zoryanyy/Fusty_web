"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const main_1 = __importDefault(require("./main"));
const users = main_1.default.define("users", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    phone: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    surname: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    login: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    address: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    access_token: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    refresh_token: { type: sequelize_1.DataTypes.STRING, allowNull: true },
}, {
    timestamps: false,
    tableName: "users",
});
exports.default = users;
