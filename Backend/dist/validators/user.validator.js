"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constant_1 = require("../constants/regex.constant");
class UserValidator {
}
exports.UserValidator = UserValidator;
_a = UserValidator;
UserValidator.userName = joi_1.default.string().min(3).max(50).trim();
UserValidator.age = joi_1.default.number().min(14).max(100);
UserValidator.email = joi_1.default.string().regex(regex_constant_1.regexConstant.EMAIL).trim();
UserValidator.password = joi_1.default.string().regex(regex_constant_1.regexConstant.PASSWORD).trim();
UserValidator.phone = joi_1.default.string().regex(regex_constant_1.regexConstant.PHONE).trim();
UserValidator.address = joi_1.default
    .string()
    .regex(regex_constant_1.regexConstant.ADDRESS)
    .min(5)
    .max(100)
    .trim();
UserValidator.surname = joi_1.default
    .string()
    .regex(regex_constant_1.regexConstant.TEXT)
    .min(3)
    .max(50)
    .trim();
UserValidator.create = joi_1.default.object({
    name: _a.userName.optional(),
    surname: _a.surname.optional(),
    address: _a.address.optional(),
    age: _a.age.optional(),
    email: _a.email.optional(),
    password: _a.password.required(),
    phone: _a.phone.required(),
});
UserValidator.login = joi_1.default.object({
    phone: _a.phone.required(),
    password: _a.password.required(),
});
