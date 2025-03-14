import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  //not Working

  public async check(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.check();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
