import { NextFunction, Request, Response } from "express";

import { IServicesDto } from "../interfaces/services.interface";
import { servicesService } from "../services/services.service";

class ServicesController {
  public async getAllServices(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await servicesService.getAllServices();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async createServices(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await servicesService.createServices(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getServicesById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const result = await servicesService.getServicesById(id);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateServices(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const dto = req.body as IServicesDto;
      const result = await servicesService.updateServices(id, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteServices(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await servicesService.deleteServices(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const servicesController = new ServicesController();
