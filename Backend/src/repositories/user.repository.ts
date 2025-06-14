import { Model, Op, Optional, Sequelize } from "sequelize";

import users from "../db/Users";
import {
  IUser,
  IUserCreateDto,
  IUserListQuary,
  IUserUpdateDto,
} from "../interfaces/user.interface";

class UserRepository {
  public async getAllUsers(
    query: IUserListQuary,
  ): Promise<{ usersList: IUser[]; totalUsers: number }> {
    const limit: number = query.limit;
    const page: number = query.page;
    const offset: number = limit * (page - 1);

    const whereClause: any = {};
    if (query.search) {
      const search: string = query.search;

      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { surname: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } },
        Sequelize.where(Sequelize.cast(Sequelize.col("age"), "TEXT"), {
          [Op.iLike]: `%${search}%`,
        }),
      ];
    }

    const allUsersRaw = await users.findAll({
      where: whereClause,
      limit,
      offset,
    });

    const totalUsers: number = await users.count({
      where: whereClause,
    });

    const usersList: IUser[] = allUsersRaw.map(
      (user) => user.get({ plain: true }) as IUser,
    );

    return { usersList, totalUsers };
  }

  public async getUserById(userId: number): Promise<IUser | null> {
    const user: Model<any, IUser> = await users.findByPk(userId);
    return user ? (user.get({ plain: true }) as IUser) : null;
  }

  public async createUser(dto: IUserCreateDto): Promise<IUser> {
    const newUser: Model<any, IUser> = await users.create({
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
    });
    return newUser.get({ plain: true }) as IUser;
  }

  public async updateById(id: number, dto: IUserUpdateDto): Promise<IUser> {
    await users.update(dto, { where: { id } });
    const updatedUser: Model<any, IUser> = await users.findByPk(id);
    return updatedUser?.get({ plain: true }) as IUser;
  }

  public async deleteById(id: number): Promise<void> {
    await users.destroy({ where: { id } });
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    const user: Model<any, IUser> = await users.findOne({
      where: { email },
      raw: true,
    });
    return user ? (user.get({ plain: true }) as IUser) : null;
  }

  //refactor on
  public async getByPhone(phone: string): Promise<IUser | null> {
    const user: Model<IUser, Optional<IUser, "id">> | null =
      await users.findOne({ where: { phone } });
    return user ? (user.toJSON() as IUser) : null;
  }
}

export const userRepository = new UserRepository();
