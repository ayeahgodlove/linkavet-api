import { Request, Response } from "express";
import { IService, IServiceResponse, emptyService } from "../../domain/models/service";
import { ServiceUseCase } from "../../domain/usecases/service.usecase";
import { ServiceRepository } from "../../data/repositories/impl/service.repository";
import { ServiceMapper } from "../mappers/mapper";
import { ServiceRequestDto } from "../dtos/service-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { User } from "../../data/entities/user";
import { deleteFile } from "../../utils/util";

const serviceRepository = new ServiceRepository();
const serviceUseCase = new ServiceUseCase(serviceRepository);
const serviceMapper = new ServiceMapper();

export class ServicesController {
  async createService(req: Request, res: Response<IServiceResponse>): Promise<void> {
    const dto = new ServiceRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const serviceResponse = await serviceUseCase.createService({
          ...dto.toData(),
        });

        res.status(201).json({
          data: serviceResponse.toJSON<IService>(),
          message: "Service created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const services = await serviceUseCase.getAll();
      const servicesDTO = serviceMapper.toDTOs(services);

      res.json(servicesDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getServiceById(req: Request, res: Response<any>): Promise<void> {
    try {
      const id = req.params.id;

      const service = await serviceUseCase.getServiceById(id);
      if (!service) {
        throw new NotFoundException("Service", id);
      }
      const serviceDTO = serviceMapper.toDTO(service);
      res.json(serviceDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  
  async getServiceBySlug(req: Request, res: Response<any>): Promise<void> {
    try {
      const slug = req.params.slug;

      const service = await serviceUseCase.getServiceBySlug(slug);
      if (!service) {
        throw new NotFoundException("Service", slug);
      }
      const serviceDTO = serviceMapper.toDTO(service);
      res.json(serviceDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }


  async updateService(req: Request, res: Response<IServiceResponse>): Promise<void> {
    const dto = new ServiceRequestDto(req.body);
    const validationErrors = await validate(dto);
    const user = req.user as User;

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: IService = {
          ...emptyService,
          ...req.body,
          id: id,
          imageUrl: req.body.imageUrl,
          authorId: user.id,
        };
        const updatedService = await serviceUseCase.updateService(obj);
        const serviceDto = serviceMapper.toDTO(updatedService);

        res.json({
          data: serviceDto,
          success: true,
          message: "Service Updated Successfully!",
          validationErrors: [],
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteService(req: Request, res: Response<IServiceResponse>): Promise<void> {
    try {
      const id = req.params.id;

      const service = await serviceUseCase.getServiceById(id);

      if (service) {
        deleteFile(service.dataValues.fileName, "services");
      }
      await serviceUseCase.deleteService(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}
