"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = require("../configs/config");
const email_type_enum_1 = require("../enums/email-type.enum");
const api_error_1 = __importDefault(require("../errors/api-error"));
const token_repository_1 = require("../repositories/token.repository");
const user_repository_1 = require("../repositories/user.repository");
const email_service_1 = require("./email.service");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
const user_service_1 = require("./user.service");
class AuthService {
    async signUp(dto) {
        await user_service_1.userService.isPhoneUnique(dto.phone);
        const password = await password_service_1.passwordService.hashPassword(dto.password);
        const user = await user_repository_1.userRepository.createUser({ ...dto, password });
        const tokens = token_service_1.tokenService.generateTokens({ userId: user.id });
        await token_repository_1.tokenRepository.create({ ...tokens, _userId: user.id });
        for (let i = 0; i <= 10; i++) {
            await email_service_1.emailService.sendEmail(email_type_enum_1.EmailTypeEnum.WELCOME, "ruslan.prokopchuk44@gmail.com", { name: user.name, frontUrl: config_1.config.frontUrl });
        }
        return { user, tokens };
    }
    async signIn(dto) {
        const user = await user_repository_1.userRepository.getByPhone(dto.phone);
        const isPasswordCorrect = await password_service_1.passwordService.comparePassword(dto.password, user.password);
        if (!isPasswordCorrect) {
            throw new api_error_1.default("Incorrect phone or password", 401);
        }
        await token_repository_1.tokenRepository.deleteAllByParams({ _userId: user.id });
        const tokens = token_service_1.tokenService.generateTokens({
            userId: user.id,
        });
        await token_repository_1.tokenRepository.create({ ...tokens, _userId: user.id });
        return { user, tokens };
    }
    async refresh(tokenPayload, refreshToken) {
        await token_repository_1.tokenRepository.deleteOneByParams({ refreshToken });
        const tokens = token_service_1.tokenService.generateTokens({
            userId: tokenPayload.userId,
        });
        await token_repository_1.tokenRepository.create({ ...tokens, _userId: tokenPayload.userId });
        return tokens;
    }
}
exports.authService = new AuthService();
