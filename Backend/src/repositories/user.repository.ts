import users from "../db/Users";
import { IUser, IUserCreateDto, IUserDto } from "../interfaces/user.interface";

class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    const all_users_raw = await users.findAll();
    return all_users_raw.map((user) => user.get({ plain: true }));
  }

  public async createUser(dto: IUserCreateDto): Promise<IUser> {
    const newUser = await users.create({
      name: dto.name,
      email: dto.email,
      age: dto.age,
      surname: dto.surname,
      address: dto.address,
      phone: dto.phone,
      password: dto.password,
    });
    return newUser.get({ plain: true }) as IUser;
  }

  public async getUserById(userId: string): Promise<IUser | null> {
    const user = await users.findByPk(userId);
    return user ? (user.get({ plain: true }) as IUser) : null;
  }

  //тут ми не використовуємо userId, так як звертаємось до бд

  public async updateUserById(id: string, dto: IUserDto): Promise<any> {
    return await users.update(dto, { where: { id } });
  }

  public async deleteUserById(id: string): Promise<void> {
    await users.destroy({ where: { id } });
  }

  // поправити проміс

  public async getByEmail(email: string): Promise<any> {
    return await users.findOne({ where: { email }, raw: true });
  }

  // поправити проміс

  public async getByPhone(phone: string): Promise<any> {
    return await users.findOne({ where: { phone }, raw: true });
  }
}

export const userRepository = new UserRepository();
