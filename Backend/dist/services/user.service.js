"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../errors/api-error");
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getAllUsers() {
        return await user_repository_1.userRepository.getAllUsers();
    }
    async createUser(dto) {
        return await user_repository_1.userRepository.createUser(dto);
    }
    async getUserById(id) {
        const services = await user_repository_1.userRepository.getUserById(id);
        if (!services) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        return services;
    }
    async updateUser(id, dto) {
        const user = await user_repository_1.userRepository.getUserById(id);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        return await user_repository_1.userRepository.updateUserById(id, dto);
    }
    async deleteUser(id) {
        const services = await user_repository_1.userRepository.getUserById(id);
        if (!services) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        await user_repository_1.userRepository.deleteUserById(id);
    }
}
exports.userService = new UserService();
