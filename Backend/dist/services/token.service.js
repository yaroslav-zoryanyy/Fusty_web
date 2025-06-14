"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const api_error_1 = __importDefault(require("../errors/api-error"));
dotenv_1.default.config();
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config_1.config.jwtAccessSecret, {
            expiresIn: +config_1.config.jwtAccessExpiresIn * 60,
        });
        const refreshToken = jwt.sign(payload, config_1.config.jwtRefreshSecret, {
            expiresIn: +config_1.config.jwtRefreshExpiresIn * 60,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    verifyToken(token, type) {
        let secret;
        if (type === "access") {
            secret = config_1.config.jwtAccessSecret;
        }
        else if (type === "refresh") {
            secret = config_1.config.jwtRefreshSecret;
        }
        else {
            throw new api_error_1.default("Invalid token type", 401);
        }
        try {
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new api_error_1.default("Invalid or expired token", 401);
        }
    }
}
exports.tokenService = new TokenService();
