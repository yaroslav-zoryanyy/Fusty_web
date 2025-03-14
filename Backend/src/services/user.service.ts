import { userRepository } from "../repositories/user.repository";

class UserService {
  public async create(dto: Partial<any>): Promise<any> {
    return await userRepository.create(dto);
  }
  public async login(dto: Partial<any>): Promise<any> {
    return await userRepository.create(dto);
  }
  public async check(): Promise<any[]> {
    return await userRepository.check();
  }
}

export const userService = new UserService();
