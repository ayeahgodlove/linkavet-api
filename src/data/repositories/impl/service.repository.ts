import { Service } from "../../entities/service";
import { IService } from "../../../domain/models/service";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IServiceRepository } from "../contracts/repository.base";

export class ServiceRepository implements IServiceRepository {
  /**
   *
   */
  constructor() {}
  findByName(name: string): Promise<Service | null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Receives a String as parameter
   * @title
   * returns Category
   */
  async findByTitle(title: string): Promise<Service | null> {
    try {
      const service = await Service.findOne({ where: { title } });
      return service;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Service as parameter
   * @service
   * returns void
   */
  async create(service: IService): Promise<Service> {
    try {
      return await Service.create<Service>({ ...service });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Service
   */
  async findById(id: string): Promise<Service | null> {
    try {
      const serviceItem = await Service.findByPk(id);

      if (!serviceItem) {
        throw new NotFoundException("Service", id);
      }
      return serviceItem;
    } catch (error) {
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<Service | null> {
    try {
      const service = await Service.findOne({ where: { slug } });
      return service;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Service
   */
  async getAll(): Promise<Service[]> {
    try {
      const services = await Service.findAll();
      return services;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Service as parameter
   * @service
   * returns void
   */
  async update(service: IService): Promise<Service> {
    const { id } = service;
    try {
      const serviceItem: any = await Service.findByPk(id);

      console.log(service);
      if (!serviceItem) {
        throw new NotFoundException("Service", id.toString());
      }

      return await serviceItem.update({ ...service });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const serviceItem = await Service.findByPk(id);

      if (!serviceItem) {
        throw new NotFoundException("Service", id);
      }

      await serviceItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
