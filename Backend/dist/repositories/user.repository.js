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
    async getUserById(userId) {
        const user = await Users_1.default.findByPk(userId);
        return user ? user.get({ plain: true }) : null;
    }
    async createUser(dto) {
        const newUser = await Users_1.default.create({
            email: dto.email,
            phone: dto.phone,
            password: dto.password,
        });
        return newUser.get({ plain: true });
    }
    async updateById(id, dto) {
        await Users_1.default.update(dto, { where: { id } });
        const updatedUser = await Users_1.default.findByPk(id);
        return updatedUser?.get({ plain: true });
    }
    async deleteById(id) {
        await Users_1.default.destroy({ where: { id } });
    }
    async getByEmail(email) {
        const user = await Users_1.default.findOne({
            where: { email },
            raw: true,
        });
        return user ? user.get({ plain: true }) : null;
    }
    async getByPhone(phone) {
        const user = await Users_1.default.findOne({
            where: { phone },
            raw: true,
        });
        return user ? user.get({ plain: true }) : null;
    }
}
exports.userRepository = new UserRepository();
