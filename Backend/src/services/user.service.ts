import ApiError from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserUpdateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async getMe(tokenPayload: ITokenPayload): Promise<IUser> {
    const user: IUser = await userRepository.getUserById(tokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateMe(
    tokenPayload: ITokenPayload,
    dto: IUserUpdateDto,
  ): Promise<IUser> {
    const user: IUser = await userRepository.getUserById(tokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.updateById(user.id, dto);
  }

  public async deleteMe(tokenPayload: ITokenPayload): Promise<void> {
    const user: IUser = await userRepository.getUserById(tokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteById(tokenPayload.userId);
  }

  public async isEmailUnique(email: string): Promise<void> {
    const user: IUser = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is already in use", 409);
    }
  }

  public async isPhoneUnique(phone: string): Promise<void> {
    const user: IUser = await userRepository.getByPhone(phone);
    if (user) {
      throw new ApiError("Phone is already in use", 409);
    }
  }

  public async getUserById(userId: number): Promise<IUser> {
    const user: IUser = await userRepository.getUserById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
}

export const userService = new UserService();
