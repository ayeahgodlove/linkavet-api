"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsController = void 0;
const contact_1 = require("../../domain/models/contact");
const contact_usecase_1 = require("../../domain/usecases/contact.usecase");
const contact_repository_1 = require("../../data/repositories/impl/contact.repository");
const mapper_1 = require("../mappers/mapper");
const contact_request_dto_1 = require("../dtos/contact-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const contactRepository = new contact_repository_1.ContactRepository();
const contactUseCase = new contact_usecase_1.ContactUseCase(contactRepository);
const contactMapper = new mapper_1.ContactMapper();
class ContactsController {
    async createContact(req, res) {
        const dto = new contact_request_dto_1.ContactRequestDto(req.body);
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
                const contactResponse = await contactUseCase.createContact(dto.toData());
                res.status(201).json({
                    data: contactResponse.toJSON(),
                    message: "Contact created Successfully!",
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
            const contactes = await contactUseCase.getAll();
            const contactsDTO = contactMapper.toDTOs(contactes);
            res.json(contactsDTO);
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
    async getContactById(req, res) {
        try {
            const id = req.params.id;
            const contact = await contactUseCase.getContactById(id);
            if (!contact) {
                throw new not_found_exception_1.NotFoundException("Contact", id);
            }
            const contactDTO = contactMapper.toDTO(contact);
            res.json(contactDTO);
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
    async updateContact(req, res) {
        const dto = new contact_request_dto_1.ContactRequestDto(req.body);
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
                    ...contact_1.emptyContact,
                    ...req.body,
                    id: id,
                };
                const updatedContact = await contactUseCase.updateContact(obj);
                const contactDto = contactMapper.toDTO(updatedContact);
                res.json({
                    data: contactDto,
                    message: "Contact Updated Successfully!",
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
    async deleteContact(req, res) {
        try {
            const id = req.params.id;
            await contactUseCase.deleteContact(id);
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
exports.ContactsController = ContactsController;
