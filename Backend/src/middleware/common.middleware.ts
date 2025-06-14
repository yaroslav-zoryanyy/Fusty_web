import { NextFunction, Request, Response } from "express";
import Joi, { ValidationErrorItem } from "joi";
import { validate as isUUID } from "uuid";

import users from "../db/Users";
import ApiError from "../errors/api-error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const id = req.params[key];
      try {
        if (!Number.isInteger(Number(id)) && !isUUID(id.toString())) {
          throw new ApiError(`Invalid id [${key}]`, 404);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public validateBody(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        const message = error.details.map((e) => e.message).join(", ");
        return next(new ApiError(message, 400));
      }

      next();
    };
  }

  public checkPhoneExists() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { phone } = req.body;

        if (!phone) {
          return next(new ApiError("Phone number is required", 400));
        }

        const existingUser = await users.findOne({ where: { phone } });

        if (existingUser) {
          return next(
            new ApiError("User with this phone number already exists", 409),
          );
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }

  public checkPhoneNotExists() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { phone } = req.body;

        if (!phone) {
          return next(new ApiError("Phone number is required", 400));
        }

        const existingUser = await users.findOne({ where: { phone } });

        if (!existingUser) {
          return next(
            new ApiError("The user with this phone number does not exist", 404),
          );
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }

  public validateUpdateUser(
    schema: Joi.ObjectSchema,
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        const message: string = error.details
          .map((e: ValidationErrorItem): string => e.message)
          .join(", ");
        return next(new ApiError(message, 400));
      }

      next();
    };
  }

  public validateQuery(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.query, { abortEarly: false });

      if (error) {
        const message = error.details.map((e) => e.message).join(", ");
        return next(new ApiError(message, 400));
      }

      next();
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
