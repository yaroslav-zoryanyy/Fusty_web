import { IUser, IUserDto } from "../interfaces/user.interface";
import users from "../db/Users";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    const all_users_raw = await users.findAll();
    return all_users_raw.map(user => user.get({ plain: true }));
  }


  public async createUser(dto: Partial<IUser>): Promise<IUser> {
    const newUser = await users.create({
      password: dto.password,
      phone: dto.phone,
    });

    return newUser.get({ plain: true }) as IUser;
  }


  public async getUserById(id: string): Promise<IUser | null> {
    const user = await users.findByPk(id);
    return user ? (user.get({ plain: true }) as IUser) : null;
  }


  public async updateUserById(id: string, dto: IUserDto): Promise<any> {
    return await users.update(dto, { where: { id } });
  }

  public async deleteUserById(id: string): Promise<void> {
    await users.destroy({ where: { id } });
  }
}

export const userRepository = new UserRepository();
