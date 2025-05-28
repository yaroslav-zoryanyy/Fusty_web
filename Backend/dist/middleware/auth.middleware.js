"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const token_type_enum_1 = require("../enums/token-type.enum");
const api_error_1 = __importDefault(require("../errors/api-error"));
const token_repository_1 = require("../repositories/token.repository");
const token_service_1 = require("../services/token.service");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new api_error_1.default("No token provided", 401);
            }
            const accessToken = header.split("Bearer ")[1];
            if (!accessToken) {
                throw new api_error_1.default("No token provided", 401);
            }
            const tokenPayload = token_service_1.tokenService.verifyToken(accessToken, token_type_enum_1.TokenTypeEnum.ACCESS);
            const pair = await token_repository_1.tokenRepository.findByParams({ accessToken });
            if (!pair) {
                throw new api_error_1.default("Invalid token", 401);
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new api_error_1.default("No token provided", 401);
            }
            const refreshToken = header.split("Bearer ")[1];
            if (!refreshToken) {
                throw new api_error_1.default("No token provided", 401);
            }
            const tokenPayload = token_service_1.tokenService.verifyToken(refreshToken, token_type_enum_1.TokenTypeEnum.REFRESH);
            const pair = await token_repository_1.tokenRepository.findByParams({ refreshToken });
            if (!pair) {
                throw new api_error_1.default("Invalid token", 401);
            }
            req.res.locals.tokenPayload = tokenPayload;
            req.res.locals.refreshToken = refreshToken;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
