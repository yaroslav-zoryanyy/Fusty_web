"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const sequelize_1 = require("sequelize");
const Users_1 = __importDefault(require("../db/Users"));
class UserRepository {
    async getAllUsers(query) {
        const limit = query.limit;
        const page = query.page;
        const offset = limit * (page - 1);
        const whereClause = {};
        if (query.search) {
            const search = query.search;
            whereClause[sequelize_1.Op.or] = [
                { name: { [sequelize_1.Op.iLike]: `%${search}%` } },
                { email: { [sequelize_1.Op.iLike]: `%${search}%` } },
                { surname: { [sequelize_1.Op.iLike]: `%${search}%` } },
                { address: { [sequelize_1.Op.iLike]: `%${search}%` } },
                sequelize_1.Sequelize.where(sequelize_1.Sequelize.cast(sequelize_1.Sequelize.col("age"), "TEXT"), {
                    [sequelize_1.Op.iLike]: `%${search}%`,
                }),
            ];
        }
        const allUsersRaw = await Users_1.default.findAll({
            where: whereClause,
            limit,
            offset,
        });
        const totalUsers = await Users_1.default.count({
            where: whereClause,
        });
        const usersList = allUsersRaw.map((user) => user.get({ plain: true }));
        return { usersList, totalUsers };
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
        const user = await Users_1.default.findOne({ where: { phone } });
        return user ? user.toJSON() : null;
    }
}
exports.userRepository = new UserRepository();
