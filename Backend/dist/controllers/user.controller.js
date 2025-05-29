"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getAllUsers(req, res, next) {
        try {
            const result = await user_service_1.userService.getAllUsers();
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async getMe(req, res, next) {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            const result = await user_service_1.userService.getMe(tokenPayload);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async updateMe(req, res, next) {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            const dto = req.body;
            const result = await user_service_1.userService.updateMe(tokenPayload, dto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteMe(req, res, next) {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            await user_service_1.userService.deleteMe(tokenPayload);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async getUserById(req, res, next) {
        try {
            const userId = req.params.userId;
            const result = await user_service_1.userService.getUserById(+userId);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
