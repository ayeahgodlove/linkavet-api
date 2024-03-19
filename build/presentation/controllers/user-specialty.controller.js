"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSpecialtyController = void 0;
const user_specialty_1 = require("../../domain/models/user-specialty");
const user_specialty_usecase_1 = require("../../domain/usecases/user-specialty.usecase");
const user_specialty_repository_1 = require("../../data/repositories/impl/user-specialty.repository");
const mapper_1 = require("../mappers/mapper");
const user_specialty_request_dto_1 = require("../dtos/user-specialty-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const userSpecialtyRepository = new user_specialty_repository_1.UserSpecialtyRepository();
const userSpecialtyUseCase = new user_specialty_usecase_1.UserSpecialtyUseCase(userSpecialtyRepository);
const userSpecialtyMapper = new mapper_1.UserSpecialtyMapper();
class UserSpecialtyController {
    async createUserSpecialty(req, res) {
        const dto = new user_specialty_request_dto_1.UserSpecialtyRequestDto(req.body);
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
                const userSpecialtyResponse = await userSpecialtyUseCase.createUserSpecialty(dto.toData());
                res.status(201).json({
                    data: userSpecialtyResponse.toJSON(),
                    message: "UserSpecialty created Successfully!",
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
            const userSpecialty = await userSpecialtyUseCase.getAll();
            const userSpecialtyDTO = userSpecialtyMapper.toDTOs(userSpecialty);
            res.json({
                data: userSpecialtyDTO,
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
    async getUserSpecialtyById(req, res) {
        try {
            const id = req.params.id;
            const userSpecialty = await userSpecialtyUseCase.getUserSpecialtyById(id);
            if (!userSpecialty) {
                throw new not_found_exception_1.NotFoundException("UserSpecialty", id);
            }
            const userSpecialtyDTO = userSpecialtyMapper.toDTO(userSpecialty);
            res.json({
                data: userSpecialtyDTO,
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
    async updateUserSpecialty(req, res) {
        const dto = new user_specialty_request_dto_1.UserSpecialtyRequestDto(req.body);
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
                    ...user_specialty_1.emptyUserSpecialty,
                    ...req.body,
                    id: id,
                };
                const updatedUserSpecialty = await userSpecialtyUseCase.updateUserSpecialty(obj);
                const userSpecialtyDto = userSpecialtyMapper.toDTO(updatedUserSpecialty);
                res.json({
                    data: userSpecialtyDto,
                    message: "UserSpecialty Updated Successfully!",
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
    async deleteUserSpecialty(req, res) {
        try {
            const id = req.params.id;
            await userSpecialtyUseCase.deleteUserSpecialty(id);
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
exports.UserSpecialtyController = UserSpecialtyController;
