"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const main_1 = __importDefault(require("./db/main"));
const index_router_1 = require("./routers/index.router");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", index_router_1.mainRouter);
const start = async () => {
    try {
        await main_1.default.authenticate();
        await main_1.default.sync({ force: false });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
