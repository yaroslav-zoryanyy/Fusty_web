import Joi, { ObjectSchema } from "joi";

import { IUserUpdateDto } from "../interfaces/user.interface";
// оптимізувати user.validator
// export const createUserSchema = Joi.object({
//   phone: Joi.string()
//     .pattern(/^(\+380|380|0)\d{9}$/)
//     .min(10)
//     .max(13)
//     .required()
//     .messages({
//       "string.base": "Phone must be a string",
//       "string.empty": "Phone is required",
//       "string.pattern.base":
//         "Phone must be in format +380XXXXXXXXX, 380XXXXXXXXX or 0XXXXXXXXX",
//       "string.min": "Phone must be at least 10 digits",
//       "string.max": "Phone must be at most 13 digits",
//       "any.required": "Phone is required",
//     }),
//   // pattent .max() not working
//   password: Joi.string()
//     .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
//     .min(8)
//     .max(16)
//     .required()
//     .messages({
//       "string.base": "Password must be a string",
//       "string.pattern.base": "Password must be a number",
//       "string.empty": "Password is required",
//       "string.min": "Password must be at least 8 characters",
//       "string.max": "Phone must be at most 16 digits",
//       "any.required": "Password is required",
//     }),
// });

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
