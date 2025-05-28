"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const uuid_1 = require("uuid");
const Users_1 = __importDefault(require("../db/Users"));
const api_error_1 = __importDefault(require("../errors/api-error"));
class CommonMiddleware {
    isIdValid(key) {
        return (req, res, next) => {
            const id = req.params[key];
            try {
                if (!Number.isInteger(Number(id)) && !(0, uuid_1.validate)(id.toString())) {
                    throw new api_error_1.default(`Invalid id [${key}]`, 404);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    validateBody(schema) {
        return (req, res, next) => {
            const { error } = schema.validate(req.body, { abortEarly: false });
            if (error) {
                const message = error.details.map((e) => e.message).join(", ");
                return next(new api_error_1.default(message, 400));
            }
            next();
        };
    }
    checkPhoneExists() {
        return async (req, res, next) => {
            try {
                const { phone } = req.body;
                if (!phone) {
                    return next(new api_error_1.default("Phone number is required", 400));
                }
                const existingUser = await Users_1.default.findOne({ where: { phone } });
                if (existingUser) {
                    return next(new api_error_1.default("User with this phone number already exists", 409));
                }
                next();
            }
            catch (error) {
                next(error);
            }
        };
    }
    checkPhoneNotExists() {
        return async (req, res, next) => {
            try {
                const { phone } = req.body;
                if (!phone) {
                    return next(new api_error_1.default("Phone number is required", 400));
                }
                const existingUser = await Users_1.default.findOne({ where: { phone } });
                if (!existingUser) {
                    return next(new api_error_1.default("The user with this phone number does not exist", 404));
                }
                next();
            }
            catch (error) {
                next(error);
            }
        };
    }
    validateUpdateUser(schema) {
        return (req, res, next) => {
            const { error } = schema.validate(req.body, { abortEarly: false });
            if (error) {
                const message = error.details.map((e) => e.message).join(", ");
                return next(new api_error_1.default(message, 400));
            }
            next();
        };
    }
}
exports.commonMiddleware = new CommonMiddleware();
