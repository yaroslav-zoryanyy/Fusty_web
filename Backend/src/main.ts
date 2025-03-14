// import module from '../models/models.ts';
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import sequelize from "./db";
import { mainRouter } from "./routers/index.router";

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api", mainRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
