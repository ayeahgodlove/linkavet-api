import { Request, Response } from "express";
import {
  ISubscriber,
  ISubscriberResponse,
  emptySubscriber,
} from "../../domain/models/subscriber";
import { SubscriberUseCase } from "../../domain/usecases/subscriber.usecase";
import { SubscriberRepository } from "../../data/repositories/impl/subscriber.repository";
import { SubscriberMapper } from "../mappers/mapper";
import { SubscriberRequestDto } from "../dtos/subscriber-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const subscriberRepository = new SubscriberRepository();
const subscriberUseCase = new SubscriberUseCase(subscriberRepository);
const subscriberMapper = new SubscriberMapper();

export class SubscribersController {
  async createSubscriber(
    req: Request,
    res: Response<ISubscriberResponse>
  ): Promise<void> {
    const dto = new SubscriberRequestDto(req.body);
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
        const subscriberResponse = await subscriberUseCase.createSubscriber(
          dto.toData()
        );

        res.status(201).json({
          data: subscriberResponse.toJSON<ISubscriber>(),
          message: "Subscriber created Successfully!",
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
      const subscribers = await subscriberUseCase.getAll();
      const subscribersDTO = subscriberMapper.toDTOs(subscribers);

      res.json({
        data: subscribersDTO,
        message: "Success",
        validationErrors: [],
        success: true,
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

  async getSubscriberById(
    req: Request,
    res: Response<ISubscriberResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const subscriber = await subscriberUseCase.getSubscriberById(id);
      if (!subscriber) {
        throw new NotFoundException("Subscriber", id);
      }
      const subscriberDTO = subscriberMapper.toDTO(subscriber);
      res.json({
        data: subscriberDTO,
        message: "Success",
        validationErrors: [],
        success: true,
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

  async updateSubscriber(
    req: Request,
    res: Response<ISubscriberResponse>
  ): Promise<void> {
    const dto = new SubscriberRequestDto(req.body);
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
        const id = req.params.id;

        const obj: ISubscriber = {
          ...emptySubscriber,
          ...req.body,
          id: id,
        };
        const updatedSubscriber = await subscriberUseCase.updateSubscriber(obj);
        const subscriberDto = subscriberMapper.toDTO(updatedSubscriber);

        res.json({
          data: subscriberDto,
          message: "Subscriber Updated Successfully!",
          validationErrors: [],
          success: true,
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

  async deleteSubscriber(
    req: Request,
    res: Response<ISubscriberResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await subscriberUseCase.deleteSubscriber(id);

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
