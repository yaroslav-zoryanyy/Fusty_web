"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    phone: joi_1.default.string()
        .pattern(/^(\+380|380|0)\d{9}$/)
        .min(10)
        .max(13)
        .required()
        .messages({
        "string.base": "Phone must be a string",
        "string.empty": "Phone is required",
        "string.pattern.base": "Phone must be in format +380XXXXXXXXX, 380XXXXXXXXX or 0XXXXXXXXX",
        "string.min": "Phone must be at least 10 digits",
        "string.max": "Phone must be at most 13 digits",
        "any.required": "Phone is required",
    }),
    password: joi_1.default.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
        .min(8)
        .max(16)
        .required()
        .messages({
        "string.base": "Password must be a string",
        "string.pattern.base": "Password must be a number",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Phone must be at most 16 digits",
        "any.required": "Password is required",
    }),
});
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
    age: joi_1.default.number().integer().min(14).max(100).required().messages({
        "number.base": "Age must be a number",
        "number.integer": "Age must be an integer",
        "number.min": "Age must be at least {#limit}",
        "number.max": "Age must be at most {#limit}",
        "any.required": "Age is required",
    }),
});
