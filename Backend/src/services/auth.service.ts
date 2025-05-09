// import ApiError from "../errors/api-error";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
// import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  //реєстрація
  public async signUp(
    dto: IUserCreateDto,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isPhoneUnique(dto.phone);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.createUser({ ...dto, password });
    const tokens = tokenService.generateTokens({
      userId: user.id,
    });
    // await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  //увійти
  // public async signIn(dto: any): Promise<{ user: IUser; tokens: ITokenPair }> {
  //   const user = await userRepository.getByEmail(dto.email);
  //   const isPasswordCorrect = await passwordService.comparePassword(
  //     dto.password,
  //     user.password,
  //   );
  //   if (!isPasswordCorrect) {
  //     throw new ApiError("Incorrect email or password", 401);
  //   }
  //   const tokens = tokenService.generateTokens({
  //     userId: user._id,
  //     role: user.role,
  //   });
  //   await tokenRepository.create({ ...tokens, _userId: user._id });
  //   return { user, tokens };
  // }
}

export const authService = new AuthService();
