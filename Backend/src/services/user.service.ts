import ApiError from "../errors/api-error";
import { IUser, IUserDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  // public async createUser(dto: Partial<any>): Promise<IUser> {
  //   return await userRepository.createUser(dto);
  // }

  public async getUserById(userId: string): Promise<IUser> {
    const services = await userRepository.getUserById(userId);
    if (!services) {
      throw new ApiError("User not found", 404);
    }
    return services;
  }

  public async updateUser(userId: string, dto: IUserDto): Promise<IUser> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.updateUserById(userId, dto);
  }

  public async deleteUser(userId: string): Promise<void> {
    const services = await userRepository.getUserById(userId);
    if (!services) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteUserById(userId);
  }

  // нещодавно добавив, потрібно перевірити чи працює коректно

  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is already in use", 409);
    }
  }

  public async isPhoneUnique(phone: string): Promise<void> {
    const user = await userRepository.getByPhone(phone);
    if (user) {
      throw new ApiError("Phone is already in use", 409);
    }
  }
}

export const userService = new UserService();
