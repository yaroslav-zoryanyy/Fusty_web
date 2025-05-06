import { ApiError } from "../errors/api-error";
import { IUser, IUserDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async createUser(dto: Partial<any>): Promise<IUser> {
    return await userRepository.createUser(dto);
  }

  public async getUserById(id: string): Promise<IUser> {
    const services = await userRepository.getUserById(id);
    if (!services) {
      throw new ApiError("User not found", 404);
    }
    return services;
  }

  public async updateUser(id: string, dto: IUserDto): Promise<IUser> {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.updateUserById(id, dto);
  }

  public async deleteUser(id: string): Promise<void> {
    const services = await userRepository.getUserById(id);
    if (!services) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteUserById(id);
  }
}

export const userService = new UserService();
