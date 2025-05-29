import { Model } from "sequelize";

import users from "../db/Users";
import {
  IUser,
  IUserCreateDto,
  IUserUpdateDto,
} from "../interfaces/user.interface";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    const all_users_raw: Model<any, IUser>[] = await users.findAll();
    return all_users_raw.map(
      (user: Model<any, IUser>): IUser => user.get({ plain: true }),
    );
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

  public async getByPhone(phone: string): Promise<IUser | null> {
    const user: Model<any, IUser> = await users.findOne({
      where: { phone },
      raw: true,
    });
    return user ? (user.get({ plain: true }) as IUser) : null;
  }
}

export const userRepository = new UserRepository();
