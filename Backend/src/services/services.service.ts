import { ApiError } from "../errors/api-error";
import {IServices, IServicesDto} from "../interfaces/services.interface";
import { servicesRepository } from "../repositories/services.repository";

class ServicesService {
  public async getAllServices(): Promise<IServices[]> {
    return await servicesRepository.getAllServices();
  }

  public async createServices(dto: Partial<any>): Promise<IServices> {
    return await servicesRepository.createServices(dto);
  }

  public async getServicesById(id: string): Promise<IServices> {
    const services = await servicesRepository.getById(id);
    if (!services) {
      throw new ApiError("User not found", 404);
    }
    return services;
  }

  public async updateServices(id: string, dto: IServicesDto): Promise<IServices> {
    const user = await servicesRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await servicesRepository.updateById(id, dto);
  }

  public async deleteServices(id: string): Promise<void> {
    const services = await servicesRepository.getById(id);
    if (!services) {
      throw new ApiError("User not found", 404);
    }
    await servicesRepository.deleteById(id);
  }
}

export const servicesService = new ServicesService();
