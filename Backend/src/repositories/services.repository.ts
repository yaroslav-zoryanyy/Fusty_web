import { IServices, IServicesDto } from "../interfaces/services.interface";
import { Services } from "../models/models";

class ServicesRepository {
  public async getAllServices(): Promise<IServices[]> {
    const services = await Services.findAll();
    return services;
  }

  public async createServices(dto: Partial<IServices>): Promise<IServices> {
    const lastService = await Services.findOne({ order: [["id", "DESC"]] });

    const newService = await Services.create({
      id: lastService ? lastService.id + 1 : 1,
      type: dto.type,
    });

    return newService;
  }

  public async getById(id: string): Promise<IServices> {
    return await Services.findByPk(id);
  }

  public async updateById(id: string, dto: IServicesDto): Promise<any> {
    return await Services.update(dto, { where: { id } });
  }

  public async deleteById(id: string): Promise<void> {
    await Services.destroy({ where: { id } });
  }
}

export const servicesRepository = new ServicesRepository();
