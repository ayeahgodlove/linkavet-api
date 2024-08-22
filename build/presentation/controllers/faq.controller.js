"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsController = void 0;
const faq_1 = require("../../domain/models/faq");
const faq_usecase_1 = require("../../domain/usecases/faq.usecase");
const faq_repository_1 = require("../../data/repositories/impl/faq.repository");
const mapper_1 = require("../mappers/mapper");
const faq_request_dto_1 = require("../dtos/faq-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const faqRepository = new faq_repository_1.FaqRepository();
const faqUseCase = new faq_usecase_1.FaqUseCase(faqRepository);
const faqMapper = new mapper_1.FaqMapper();
class FaqsController {
    async createFaq(req, res) {
        const dto = new faq_request_dto_1.FaqRequestDto(req.body);
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
                const faqResponse = await faqUseCase.createFaq({
                    ...dto.toData(),
                });
                res.status(201).json({
                    data: faqResponse.toJSON(),
                    message: "Faq created Successfully!",
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
            const faqs = await faqUseCase.getAll();
            const faqsDTO = faqMapper.toDTOs(faqs);
            res.json(faqsDTO);
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
    async getFaqById(req, res) {
        try {
            const id = req.params.id;
            const faq = await faqUseCase.getFaqById(id);
            if (!faq) {
                throw new not_found_exception_1.NotFoundException("Faq", id);
            }
            const faqDTO = faqMapper.toDTO(faq);
            res.json(faqDTO);
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
    async updateFaq(req, res) {
        const dto = new faq_request_dto_1.FaqRequestDto(req.body);
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
                    ...faq_1.emptyFaq,
                    ...req.body,
                    id: id,
                };
                const updatedFaq = await faqUseCase.updateFaq(obj);
                const faqDto = faqMapper.toDTO(updatedFaq);
                res.json({
                    data: faqDto,
                    message: "Faq Updated Successfully!",
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
    async deleteFaq(req, res) {
        try {
            const id = req.params.id;
            const faq = await faqUseCase.getFaqById(id);
            if (faq) {
                await faqUseCase.deleteFaq(id);
            }
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
exports.FaqsController = FaqsController;
