import Joi, { ObjectSchema } from "joi";

import { OrderEnum } from "../enums/order.enum";
import { UserListOrderEnum } from "../enums/user-list-order.enum";
import { IUserUpdateDto } from "../interfaces/user.interface";

export const updateUserSchema: ObjectSchema<IUserUpdateDto> = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-zА-Яа-яЇїІіЄєҐґ'’\s\-]+$/)
    .messages({
      "string.pattern.base":
        "Name can contain only letters, hyphens, spaces, and apostrophes",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must be at most 50 characters long",
    }),

  surname: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-zА-Яа-яЇїІіЄєҐґ'’\s\-]+$/)
    .messages({
      "string.pattern.base":
        "Surname can contain only letters, hyphens, spaces, and apostrophes",
      "string.min": "Surname must be at least 3 characters long",
      "string.max": "Surname must be at most 50 characters long",
    }),

  address: Joi.string()
    .min(5)
    .max(100)
    .pattern(/^[A-Za-zА-Яа-яЇїІіЄєҐґ0-9'’\s\-]+$/)
    .messages({
      "string.min": "Address must be at least 5 characters long",
      "string.max": "Address must be at most 100 characters long",
      "string.pattern.base":
        "Address can contain only letters, hyphens, spaces, and apostrophes",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } }) // валідація email false - не перевіряє, чи справжній TLD.
    .min(5)
    .max(100)
    .messages({
      "string.email": "Email must be a valid email address",
      "string.min": "Email must be at least 5 characters long",
      "string.max": "Email must be at most 100 characters long",
    }),

  age: Joi.number().integer().min(14).max(100).messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least {#limit}",
    "number.max": "Age must be at most {#limit}",
    "any.required": "Age is required",
  }),
});

export const queryUserSchema: ObjectSchema<any> = Joi.object({
  limit: Joi.number().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be at least 1 user long",
    "number.max": "Limit must be at most 100 users long",
  }),
  page: Joi.number().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1 page long",
  }),
  search: Joi.string().trim().messages({
    "string.pattern.base": "Search must be a string",
  }),
  order: Joi.string()
    .valid(...Object.values(OrderEnum))
    .default(OrderEnum.ASC)
    .messages({
      "string.pattern.base": "Order must be a string",
    }),
  orderBy: Joi.string()
    .valid(...Object.values(UserListOrderEnum))
    .default(UserListOrderEnum.GREATED_AT)
    .messages({
      "string.pattern.base": "OrderBy must be a string",
    }),
});
