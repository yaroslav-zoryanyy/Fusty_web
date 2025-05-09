"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const sequelize_1 = require("sequelize");
const api_error_1 = __importDefault(require("../errors/api-error"));
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof api_error_1.default) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
    if (err instanceof sequelize_1.UniqueConstraintError || err instanceof sequelize_1.ValidationError) {
        const message = err.errors.map((e) => e.message).join(", ");
        res.status(400).json({ message });
        return;
    }
    res.status(500).json({ message: "Internal Server Error" });
};
exports.errorHandler = errorHandler;
