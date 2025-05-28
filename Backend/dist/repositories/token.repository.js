"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
const Tokens_1 = __importDefault(require("../db/Tokens"));
class TokenRepository {
    async create(dto) {
        const token = await Tokens_1.default.create({
            accessToken: dto.accessToken,
            refreshToken: dto.refreshToken,
            _userId: dto._userId,
        });
        return token.get({ plain: true });
    }
    async findByParams(params) {
        const token = await Tokens_1.default.findOne({ where: params });
        return token?.get({ plain: true });
    }
    async deleteOneByParams(params) {
        await Tokens_1.default.destroy({ where: params });
    }
    async deleteAllByParams(params) {
        await Tokens_1.default.destroy({ where: params });
    }
}
exports.tokenRepository = new TokenRepository();
