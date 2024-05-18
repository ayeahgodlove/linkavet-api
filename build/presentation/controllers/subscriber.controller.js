"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribersController = void 0;
const subscriber_1 = require("../../domain/models/subscriber");
const subscriber_usecase_1 = require("../../domain/usecases/subscriber.usecase");
const subscriber_repository_1 = require("../../data/repositories/impl/subscriber.repository");
const mapper_1 = require("../mappers/mapper");
const subscriber_request_dto_1 = require("../dtos/subscriber-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const subscriberRepository = new subscriber_repository_1.SubscriberRepository();
const subscriberUseCase = new subscriber_usecase_1.SubscriberUseCase(subscriberRepository);
const subscriberMapper = new mapper_1.SubscriberMapper();
class SubscribersController {
    async createSubscriber(req, res) {
        const dto = new subscriber_request_dto_1.SubscriberRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const subscriberResponse = await subscriberUseCase.createSubscriber(dto.toData());
                res.status(201).json({
                    data: subscriberResponse.toJSON(),
                    message: "Subscriber created Successfully!",
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
    }
    async getAll(req, res) {
        try {
            const subscribers = await subscriberUseCase.getAll();
            const subscribersDTO = subscriberMapper.toDTOs(subscribers);
            res.json({
                data: subscribersDTO,
                message: "Success",
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
    async getSubscriberById(req, res) {
        try {
            const id = req.params.id;
            const subscriber = await subscriberUseCase.getSubscriberById(id);
            if (!subscriber) {
                throw new not_found_exception_1.NotFoundException("Subscriber", id);
            }
            const subscriberDTO = subscriberMapper.toDTO(subscriber);
            res.json({
                data: subscriberDTO,
                message: "Success",
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
    async updateSubscriber(req, res) {
        const dto = new subscriber_request_dto_1.SubscriberRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const id = req.params.id;
                const obj = {
                    ...subscriber_1.emptySubscriber,
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
    }
    async deleteSubscriber(req, res) {
        try {
            const id = req.params.id;
            await subscriberUseCase.deleteSubscriber(id);
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
exports.SubscribersController = SubscribersController;
