"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./configs/config");
const main_1 = __importDefault(require("./db/main"));
const error_middleware_1 = require("./middleware/error.middleware");
const auth_router_1 = require("./routers/auth.router");
const index_router_1 = require("./routers/index.router");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_router_1.authRouter);
app.use("/api", index_router_1.mainRouter);
app.use(error_middleware_1.errorHandler);
const start = async () => {
    try {
        await main_1.default.authenticate();
        await main_1.default.sync({ alter: true });
        console.log("Database connected");
        app.listen(config_1.config.port, () => {
            console.log(`Server has been started on port ${config_1.config.port}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
    }
};
start();
