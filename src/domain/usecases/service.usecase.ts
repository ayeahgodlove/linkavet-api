import { Service } from "../../data/entities/service";
import { IServiceRepository } from "../../data/repositories/contracts/repository.base";
import { IService } from "../models/service";
import slugify from "slugify";
export class ServiceUseCase {
  /**
   *
   */
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async createService(service: IService): Promise<Service> {
    const existingService = await this.serviceRepository.findByTitle(service.title);

    if (existingService) {
      throw new Error("Service already exists");
    }
    return this.serviceRepository.create(service);
  }

  async getAll(): Promise<Service[]> {
    return this.serviceRepository.getAll();
  }

  async getServiceById(id: string): Promise<Service | null> {
    return this.serviceRepository.findById(id);
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    return this.serviceRepository.findBySlug(slug);
  }
  
  async updateService(service: IService): Promise<Service> {
    const obj: IService = {
      ...service,
      slug: slugify(service.title, { lower: true, replacement: "-" }),
    };
    return this.serviceRepository.update(obj);
  }

  async deleteService(id: string): Promise<void> {
    return this.serviceRepository.delete(id);
  }
}
