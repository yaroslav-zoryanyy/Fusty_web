"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = __importDefault(require("../errors/api-error"));
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getAllUsers() {
        return await user_repository_1.userRepository.getAllUsers();
    }
    async getUserById(userId) {
        const services = await user_repository_1.userRepository.getUserById(userId);
        if (!services) {
            throw new api_error_1.default("User not found", 404);
        }
        return services;
    }
    async updateUser(userId, dto) {
        const user = await user_repository_1.userRepository.getUserById(userId);
        if (!user) {
            throw new api_error_1.default("User not found", 404);
        }
        return await user_repository_1.userRepository.updateUserById(userId, dto);
    }
    async deleteUser(userId) {
        const services = await user_repository_1.userRepository.getUserById(userId);
        if (!services) {
            throw new api_error_1.default("User not found", 404);
        }
        await user_repository_1.userRepository.deleteUserById(userId);
    }
    async isEmailUnique(email) {
        const user = await user_repository_1.userRepository.getByEmail(email);
        if (user) {
            throw new api_error_1.default("Email is already in use", 409);
        }
    }
    async isPhoneUnique(phone) {
        const user = await user_repository_1.userRepository.getByPhone(phone);
        if (user) {
            throw new api_error_1.default("Phone is already in use", 409);
        }
    }
}
exports.userService = new UserService();
