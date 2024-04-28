import { Request, Response } from "express";
import { IEvent, IEventResponse, emptyEvent } from "../../domain/models/event";
import { EventUseCase } from "../../domain/usecases/event.usecase";
import { EventRepository } from "../../data/repositories/impl/event.repository";
import { EventMapper } from "../mappers/mapper";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const eventRepository = new EventRepository();
const eventUseCase = new EventUseCase(eventRepository);
const eventMapper = new EventMapper();

export class EventsController {
  async createEvent(
    req: Request,
    res: Response<IEventResponse>
  ): Promise<void> {
    const dto = new req.body();

    try {
      const eventResponse = await eventUseCase.createEvent(dto.toData());

      res.status(201).json({
        data: eventResponse.toJSON<IEvent>(),
        message: "Event created Successfully!",
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

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const events = await eventUseCase.getAll();
      const eventsDTO = eventMapper.toDTOs(events);

      res.json({
        data: eventsDTO,
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

  async getEventById(
    req: Request,
    res: Response<IEventResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const event = await eventUseCase.getEventById(id);
      if (!event) {
        throw new NotFoundException("Event", id);
      }
      const eventDTO = eventMapper.toDTO(event);
      res.json({
        data: eventDTO,
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

  async updateEvent(
    req: Request,
    res: Response<IEventResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const obj: IEvent = {
        ...emptyEvent,
        ...req.body,
        id: id,
      };
      const updatedEvent = await eventUseCase.updateEvent(obj);
      const eventDto = eventMapper.toDTO(updatedEvent);

      res.json({
        data: eventDto,
        message: "Event Updated Successfully!",
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

  async deleteEvent(
    req: Request,
    res: Response<IEventResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await eventUseCase.deleteEvent(id);

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
