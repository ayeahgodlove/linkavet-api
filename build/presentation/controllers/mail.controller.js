"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailsController = void 0;
const mail_1 = require("../../domain/models/mail");
const mail_usecase_1 = require("../../domain/usecases/mail.usecase");
const mail_repository_1 = require("../../data/repositories/impl/mail.repository");
const mapper_1 = require("../mappers/mapper");
const mail_request_dto_1 = require("../dtos/mail-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const mailRepository = new mail_repository_1.MailRepository();
const mailUseCase = new mail_usecase_1.MailUseCase(mailRepository);
const mailMapper = new mapper_1.MailMapper();
class MailsController {
    async createMail(req, res) {
        const dto = new mail_request_dto_1.MailRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const media = req.body.media;
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
                const mailResponse = await mailUseCase.createMail({
                    ...dto.toData(),
                    media,
                });
                res.status(201).json({
                    data: mailResponse.toJSON(),
                    message: "Mail created Successfully!",
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
            const mails = await mailUseCase.getAll();
            const mailsDTO = mailMapper.toDTOs(mails);
            res.json({
                data: mailsDTO,
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
    async getMailById(req, res) {
        try {
            const id = req.params.id;
            const mail = await mailUseCase.getMailById(id);
            if (!mail) {
                throw new not_found_exception_1.NotFoundException("Mail", id);
            }
            const mailDTO = mailMapper.toDTO(mail);
            res.json({
                data: mailDTO,
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
    async updateMail(req, res) {
        const dto = new mail_request_dto_1.MailRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        const media = req.body.media;
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
                    ...mail_1.emptyMail,
                    ...req.body,
                    id: id,
                    media,
                };
                const updatedMail = await mailUseCase.updateMail(obj);
                const mailDto = mailMapper.toDTO(updatedMail);
                res.json({
                    data: mailDto,
                    message: "Mail Updated Successfully!",
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
    async deleteMail(req, res) {
        try {
            const id = req.params.id;
            await mailUseCase.deleteMail(id);
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
exports.MailsController = MailsController;
