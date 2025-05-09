import { NextFunction, Request, Response } from "express";

import { IUserCreateDto } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  //реєстрація
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserCreateDto;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  // //увійти
  // public async signIn(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const dto = req.body as any;
  //     const result = await authService.signIn(dto);
  //     res.status(201).json(result);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export const authController = new AuthController();
