"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.sequelize = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const Users_1 = __importDefault(require("./Users"));
exports.Users = Users_1.default;
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    logging: false,
});
exports.sequelize = sequelize;
