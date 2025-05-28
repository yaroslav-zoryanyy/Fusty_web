"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const token_repository_1 = require("../repositories/token.repository");
const user_repository_1 = require("../repositories/user.repository");
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
        return { user, tokens };
    }
}
exports.authService = new AuthService();
