"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesController = void 0;
const service_1 = require("../../domain/models/service");
const service_usecase_1 = require("../../domain/usecases/service.usecase");
const service_repository_1 = require("../../data/repositories/impl/service.repository");
const mapper_1 = require("../mappers/mapper");
const service_request_dto_1 = require("../dtos/service-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const util_1 = require("../../utils/util");
const serviceRepository = new service_repository_1.ServiceRepository();
const serviceUseCase = new service_usecase_1.ServiceUseCase(serviceRepository);
const serviceMapper = new mapper_1.ServiceMapper();
class ServicesController {
    async createService(req, res) {
        const dto = new service_request_dto_1.ServiceRequestDto(req.body);
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
                const serviceResponse = await serviceUseCase.createService({
                    ...dto.toData(),
                });
                res.status(201).json({
                    data: serviceResponse.toJSON(),
                    message: "Service created Successfully!",
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
            const services = await serviceUseCase.getAll();
            const servicesDTO = serviceMapper.toDTOs(services);
            res.json(servicesDTO);
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
    async getServiceById(req, res) {
        try {
            const id = req.params.id;
            const service = await serviceUseCase.getServiceById(id);
            if (!service) {
                throw new not_found_exception_1.NotFoundException("Service", id);
            }
            const serviceDTO = serviceMapper.toDTO(service);
            res.json(serviceDTO);
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
    async getServiceBySlug(req, res) {
        try {
            const slug = req.params.slug;
            const service = await serviceUseCase.getServiceBySlug(slug);
            if (!service) {
                throw new not_found_exception_1.NotFoundException("Service", slug);
            }
            const serviceDTO = serviceMapper.toDTO(service);
            res.json(serviceDTO);
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
    async updateService(req, res) {
        const dto = new service_request_dto_1.ServiceRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const user = req.user;
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
                    ...service_1.emptyService,
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
    async deleteService(req, res) {
        try {
            const id = req.params.id;
            const service = await serviceUseCase.getServiceById(id);
            if (service) {
                (0, util_1.deleteFile)(service.dataValues.fileName, "services");
            }
            await serviceUseCase.deleteService(id);
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
exports.ServicesController = ServicesController;
