"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const user_router_1 = require("./user.router");
const router = (0, express_1.Router)();
router.use("/user", user_router_1.userRouter);
exports.mainRouter = router;
