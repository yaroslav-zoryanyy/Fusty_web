import { NextFunction, Request, Response } from "express";

import { TokenTypeEnum } from "../enums/token-type.enum";
import ApiError from "../errors/api-error";
import { IToken, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const header: string = req.headers.authorization;
      if (!header) {
        throw new ApiError("No token provided", 401);
      }
      const accessToken: string = header.split("Bearer ")[1];
      if (!accessToken) {
        throw new ApiError("No token provided", 401);
      }
      const tokenPayload: ITokenPayload = tokenService.verifyToken(
        accessToken,
        TokenTypeEnum.ACCESS,
      );
      const pair: IToken = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.tokenPayload = tokenPayload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const header: string = req.headers.authorization;
      if (!header) {
        throw new ApiError("No token provided", 401);
      }
      const refreshToken: string = header.split("Bearer ")[1];
      if (!refreshToken) {
        throw new ApiError("No token provided", 401);
      }
      const tokenPayload: ITokenPayload = tokenService.verifyToken(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );

      const pair: IToken = await tokenRepository.findByParams({ refreshToken });
      if (!pair) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.tokenPayload = tokenPayload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
