import ApiError from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ILogin, IUser, IUserCreateDto } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async signUp(
    dto: IUserCreateDto,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isPhoneUnique(dto.phone);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.createUser({ ...dto, password });
    const tokens = tokenService.generateTokens({ userId: user.id });
    await tokenRepository.create({ ...tokens, _userId: user.id });
    return { user, tokens };
  }

  public async signIn(
    dto: ILogin,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user: IUser = await userRepository.getByPhone(dto.phone);
    const isPasswordCorrect: boolean = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Incorrect phone or password", 401);
    }
    await tokenRepository.deleteAllByParams({ _userId: user.id });
    const tokens: ITokenPair = tokenService.generateTokens({
      userId: user.id,
    });
    await tokenRepository.create({ ...tokens, _userId: user.id });
    return { user, tokens };
  }

  public async refresh(
    tokenPayload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens: ITokenPair = tokenService.generateTokens({
      userId: tokenPayload.userId,
    });
    await tokenRepository.create({ ...tokens, _userId: tokenPayload.userId });
    return tokens;
  }
}

export const authService = new AuthService();
