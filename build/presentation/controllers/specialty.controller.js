"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtyController = void 0;
const specialty_usecase_1 = require("../../domain/usecases/specialty.usecase");
const specialty_repository_1 = require("../../data/repositories/impl/specialty.repository");
const mapper_1 = require("../mappers/mapper");
const specialty_request_dto_1 = require("../dtos/specialty-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const specialtyRepository = new specialty_repository_1.SpecialtyRepository();
const specialtyUseCase = new specialty_usecase_1.SpecialtyUseCase(specialtyRepository);
const specialtyMapper = new mapper_1.SpecialtyMapper();
class SpecialtyController {
    async createSpecialty(req, res) {
        const dto = new specialty_request_dto_1.SpecialtyRequestDto(req.body);
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
                const SpecialtyResponse = await specialtyUseCase.createSpecialty({
                    ...dto.toData(),
                    fullname: req.body.fullname,
                    title: req.body.title,
                    website: req.body.website,
                    yearsOfExperience: req.body.yearsOfExperience,
                });
                res.status(201).json({
                    data: SpecialtyResponse.toJSON(),
                    message: "Specialty created Successfully!",
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
            const specialties = await specialtyUseCase.getAll();
            const specialtiesDTO = specialtyMapper.toDTOs(specialties);
            res.json(specialtiesDTO);
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
    async getSpecialtyById(req, res) {
        try {
            const id = req.params.id;
            const Specialty = await specialtyUseCase.getSpecialtyById(id);
            if (!Specialty) {
                throw new not_found_exception_1.NotFoundException("Specialty", id);
            }
            const specialtyDTO = specialtyMapper.toDTO(Specialty);
            res.json(specialtyDTO);
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
    async updateSpecialty(req, res) {
        const dto = new specialty_request_dto_1.SpecialtyRequestDto(req.body);
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
                    ...req.body,
                    id: id,
                    fullname: req.body.fullname,
                    title: req.body.title,
                    website: req.body.website,
                    yearsOfExperience: req.body.yearsOfExperience,
                };
                const updatedSpecialty = await specialtyUseCase.updateSpecialty(obj);
                const SpecialtyDto = specialtyMapper.toDTO(updatedSpecialty);
                res.json({
                    data: SpecialtyDto,
                    message: "Specialty Updated Successfully!",
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
    async deleteSpecialty(req, res) {
        try {
            const id = req.params.id;
            await specialtyUseCase.deleteSpecialty(id);
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
exports.SpecialtyController = SpecialtyController;
