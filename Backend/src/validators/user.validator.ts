import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  private static userName = joi.string().min(3).max(50).trim();
  private static age = joi.number().min(14).max(100);
  private static email = joi.string().regex(regexConstant.EMAIL).trim();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static phone = joi.string().regex(regexConstant.PHONE).trim();
  private static address = joi
    .string()
    .regex(regexConstant.ADDRESS)
    .min(5)
    .max(100)
    .trim();
  private static surname = joi
    .string()
    .regex(regexConstant.TEXT)
    .min(3)
    .max(50)
    .trim();

  public static create = joi.object({
    name: this.userName.optional(),
    surname: this.surname.optional(),
    address: this.address.optional(),
    age: this.age.optional(),
    email: this.email.optional(),
    password: this.password.required(),
    phone: this.phone.required(),
  });

  public static update = joi.object({
    name: this.userName,
    age: this.age,
    phone: this.phone,
  });
}
