import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

import { config } from "../configs/config";
import ApiError from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

dotenv.config();

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.jwtAccessSecret, {
      expiresIn: +config.jwtAccessExpiresIn * 60,
    });

    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: +config.jwtRefreshExpiresIn * 60,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public verifyToken(token: string, type: "access" | "refresh"): ITokenPayload {
    try {
      let secret: string;
      if (type === "access") {
        secret = config.jwtAccessSecret;
      } else if (type === "refresh") {
        secret = config.jwtRefreshSecret;
      } else {
        throw new ApiError("Invalid token type", 401);
      }
      try {
        return jwt.verify(token, secret) as ITokenPayload;
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      throw new ApiError(e, 401);
    }
  }
}

export const tokenService = new TokenService();
