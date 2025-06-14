"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryUserSchema = exports.updateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const order_enum_1 = require("../enums/order.enum");
const user_list_order_enum_1 = require("../enums/user-list-order.enum");
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(50)
        .pattern(/^[A-Za-zА-Яа-яЇїІіЄєҐґ'’\s\-]+$/)
        .messages({
        "string.pattern.base": "Name can contain only letters, hyphens, spaces, and apostrophes",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 50 characters long",
    }),
    surname: joi_1.default.string()
        .min(3)
        .max(50)
        .pattern(/^[A-Za-zА-Яа-яЇїІіЄєҐґ'’\s\-]+$/)
        .messages({
        "string.pattern.base": "Surname can contain only letters, hyphens, spaces, and apostrophes",
        "string.min": "Surname must be at least 3 characters long",
        "string.max": "Surname must be at most 50 characters long",
    }),
    address: joi_1.default.string()
        .min(5)
        .max(100)
        .pattern(/^[A-Za-zА-Яа-яЇїІіЄєҐґ0-9'’\s\-]+$/)
        .messages({
        "string.min": "Address must be at least 5 characters long",
        "string.max": "Address must be at most 100 characters long",
        "string.pattern.base": "Address can contain only letters, hyphens, spaces, and apostrophes",
    }),
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .min(5)
        .max(100)
        .messages({
        "string.email": "Email must be a valid email address",
        "string.min": "Email must be at least 5 characters long",
        "string.max": "Email must be at most 100 characters long",
    }),
    age: joi_1.default.number().integer().min(14).max(100).messages({
        "number.base": "Age must be a number",
        "number.integer": "Age must be an integer",
        "number.min": "Age must be at least {#limit}",
        "number.max": "Age must be at most {#limit}",
        "any.required": "Age is required",
    }),
});
exports.queryUserSchema = joi_1.default.object({
    limit: joi_1.default.number().min(1).max(100).default(10).messages({
        "number.base": "Limit must be a number",
        "number.min": "Limit must be at least 1 user long",
        "number.max": "Limit must be at most 100 users long",
    }),
    page: joi_1.default.number().min(1).default(1).messages({
        "number.base": "Page must be a number",
        "number.min": "Page must be at least 1 page long",
    }),
    search: joi_1.default.string().trim().messages({
        "string.pattern.base": "Search must be a string",
    }),
    order: joi_1.default.string()
        .valid(...Object.values(order_enum_1.OrderEnum))
        .default(order_enum_1.OrderEnum.ASC)
        .messages({
        "string.pattern.base": "Order must be a string",
    }),
    orderBy: joi_1.default.string()
        .valid(...Object.values(user_list_order_enum_1.UserListOrderEnum))
        .default(user_list_order_enum_1.UserListOrderEnum.GREATED_AT)
        .messages({
        "string.pattern.base": "OrderBy must be a string",
    }),
});
