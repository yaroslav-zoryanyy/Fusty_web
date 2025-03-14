import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
  public async check(): Promise<any[]> {
    return await read();
  }

  public async create(dto: Partial<IUser>): Promise<any> {
    const users = await read();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      surname: dto.surname,
      phone: dto.phone,
      password: dto.password,
      address: dto.address,
      role: dto.role,
    };
    users.push(newUser);
    await write(users);
    return newUser;
  }
}

export const userRepository = new UserRepository();
