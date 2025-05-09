import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { config } from "./configs/config";
import sequelize from "./db/main";
import { errorHandler } from "./middleware/error.middleware";
import { authRouter } from "./routers/auth.router";
import { mainRouter } from "./routers/index.router";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", mainRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected");

    app.listen(config.port, () => {
      console.log(`Server has been started on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

start();
