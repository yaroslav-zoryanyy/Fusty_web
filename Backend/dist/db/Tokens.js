"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const main_1 = __importDefault(require("./main"));
const Token = main_1.default.define("tokens", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    accessToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    _userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: false,
    tableName: "tokens",
});
exports.default = Token;
