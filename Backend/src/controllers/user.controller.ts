import { NextFunction, Request, Response } from "express";

import { IUserDto } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAllUsers();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  // public async createUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const dto = req.body as any;
  //     const result = await userService.createUser(dto);
  //     res.status(201).json(result);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const result = await userService.getUserById(userId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const dto = req.body as IUserDto;
      const result = await userService.updateUser(userId, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      await userService.deleteUser(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
