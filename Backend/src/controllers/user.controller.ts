import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserUpdateDto } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result: IUser[] = await userService.getAllUsers();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenPayload: ITokenPayload = req.res.locals.tokenPayload;
      const result: IUser = await userService.getMe(tokenPayload);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenPayload: ITokenPayload = req.res.locals.tokenPayload;
      const dto: IUserUpdateDto = req.body;
      const result: IUser = await userService.updateMe(tokenPayload, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenPayload: ITokenPayload = req.res.locals.tokenPayload;
      await userService.deleteMe(tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async getUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const result: IUser = await userService.getUserById(+userId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
