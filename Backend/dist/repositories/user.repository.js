"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const Users_1 = __importDefault(require("../db/Users"));
class UserRepository {
    async getAllUsers() {
        const all_users_raw = await Users_1.default.findAll();
        return all_users_raw.map((user) => user.get({ plain: true }));
    }
    async createUser(dto) {
        const newUser = await Users_1.default.create({
            password: dto.password,
            phone: dto.phone,
        });
        return newUser.get({ plain: true });
    }
    async getUserById(id) {
        const user = await Users_1.default.findByPk(id);
        return user ? user.get({ plain: true }) : null;
    }
    async updateUserById(id, dto) {
        return await Users_1.default.update(dto, { where: { id } });
    }
    async deleteUserById(id) {
        await Users_1.default.destroy({ where: { id } });
    }
}
exports.userRepository = new UserRepository();
