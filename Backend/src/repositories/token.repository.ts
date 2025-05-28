import Token from "../db/Tokens";
import { IToken } from "../interfaces/token.interface";

class TokenRepository {
  public async create(dto: IToken): Promise<IToken> {
    const token = await Token.create({
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      _userId: dto._userId,
    });
    return token.get({ plain: true }) as IToken;
  }

  public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
    const token = await Token.findOne({ where: params });
    return token?.get({ plain: true }) as IToken;
  }

  public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
    await Token.destroy({ where: params });
  }

  public async deleteAllByParams(params: Partial<IToken>): Promise<void> {
    await Token.destroy({ where: params });
  }
}

export const tokenRepository = new TokenRepository();
