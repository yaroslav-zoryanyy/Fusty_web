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
    async createUser(req, res, next) {
        try {
            const dto = req.body;
            const result = await user_service_1.userService.createUser(dto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await user_service_1.userService.getUserById(id);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async updateUser(req, res, next) {
        try {
            const id = req.params.id;
            const dto = req.body;
            const result = await user_service_1.userService.updateUser(id, dto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            await user_service_1.userService.deleteUser(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
