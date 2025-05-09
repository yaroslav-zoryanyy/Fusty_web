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
            name: dto.name,
            email: dto.email,
            age: dto.age,
            surname: dto.surname,
            address: dto.address,
            phone: dto.phone,
            password: dto.password,
        });
        return newUser.get({ plain: true });
    }
    async getUserById(userId) {
        const user = await Users_1.default.findByPk(userId);
        return user ? user.get({ plain: true }) : null;
    }
    async updateUserById(id, dto) {
        return await Users_1.default.update(dto, { where: { id } });
    }
    async deleteUserById(id) {
        await Users_1.default.destroy({ where: { id } });
    }
    async getByEmail(email) {
        return await Users_1.default.findOne({ where: { email }, raw: true });
    }
    async getByPhone(phone) {
        return await Users_1.default.findOne({ where: { phone }, raw: true });
    }
}
exports.userRepository = new UserRepository();
