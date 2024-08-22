"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const event_1 = require("../../domain/models/event");
const event_usecase_1 = require("../../domain/usecases/event.usecase");
const event_repository_1 = require("../../data/repositories/impl/event.repository");
const mapper_1 = require("../mappers/mapper");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const nanoid_1 = require("nanoid");
const eventRepository = new event_repository_1.EventRepository();
const eventUseCase = new event_usecase_1.EventUseCase(eventRepository);
const eventMapper = new mapper_1.EventMapper();
class EventsController {
    async createEvent(req, res) {
        const dto = req.body;
        const user = req.user;
        try {
            const eventResponse = await eventUseCase.createEvent({
                ...dto,
                id: (0, nanoid_1.nanoid)(10),
                userId: user.dataValues.id,
            });
            res.status(201).json({
                data: eventResponse.toJSON(),
                message: "Event created Successfully!",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [],
                success: false,
            });
        }
    }
    async getAll(req, res) {
        try {
            const events = await eventUseCase.getAll();
            const eventsDTO = eventMapper.toDTOs(events);
            res.json(eventsDTO);
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async getEventById(req, res) {
        try {
            const id = req.params.id;
            const event = await eventUseCase.getEventById(id);
            if (!event) {
                throw new not_found_exception_1.NotFoundException("Event", id);
            }
            const eventDTO = eventMapper.toDTO(event);
            res.json(eventDTO);
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async updateEvent(req, res) {
        try {
            const id = req.params.id;
            const user = req.user;
            const obj = {
                ...event_1.emptyEvent,
                ...req.body,
                id: id,
                userId: user.dataValues.id,
            };
            const updatedEvent = await eventUseCase.updateEvent(obj);
            const eventDto = eventMapper.toDTO(updatedEvent);
            res.json({
                data: eventDto,
                message: "Event Updated Successfully!",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async deleteEvent(req, res) {
        try {
            const id = req.params.id;
            await eventUseCase.deleteEvent(id);
            res.status(204).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: null,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: true,
            });
        }
    }
}
exports.EventsController = EventsController;
