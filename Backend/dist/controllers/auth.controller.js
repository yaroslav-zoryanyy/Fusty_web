"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async signUp(req, res, next) {
        try {
            const dto = req.body;
            const result = await auth_service_1.authService.signUp(dto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
