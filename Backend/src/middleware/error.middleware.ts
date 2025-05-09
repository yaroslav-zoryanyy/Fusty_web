import { ErrorRequestHandler } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";

import ApiError from "../errors/api-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof UniqueConstraintError || err instanceof ValidationError) {
    const message = err.errors.map((e) => e.message).join(", ");
    res.status(400).json({ message });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
};
