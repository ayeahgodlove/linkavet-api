"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocsController = void 0;
const user_doc_1 = require("../../domain/models/user-doc");
const user_doc_usecase_1 = require("../../domain/usecases/user-doc.usecase");
const user_doc_repository_1 = require("../../data/repositories/impl/user-doc.repository");
const mapper_1 = require("../mappers/mapper");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const user_1 = require("../../data/entities/user");
const user_doc_2 = require("../../data/entities/user-doc");
const user_doc_request_dto_1 = require("../dtos/user-doc-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const userDocRepository = new user_doc_repository_1.UserDocRepository();
const userDocUseCase = new user_doc_usecase_1.UserDocUseCase(userDocRepository);
const userDocMapper = new mapper_1.UserDocMapper();
class UserDocsController {
    async createUserDoc(req, res) {
        const dto = new user_doc_request_dto_1.UserDocRequestDto(req.body);
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
                const userDocResponse = await userDocUseCase.createUserDoc(dto.toData());
                res.status(201).json({
                    data: userDocResponse.toJSON(),
                    message: "UserDoc submitted Successfully!",
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
            const userDocs = await userDocUseCase.getAll();
            const userDocsDTO = userDocMapper.toDTOs(userDocs);
            res.json(userDocsDTO);
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
    async getUserDocById(req, res) {
        try {
            const id = req.params.id;
            const userDoc = await user_doc_2.UserDoc.findByPk(id);
            if (!userDoc) {
                throw new not_found_exception_1.NotFoundException("UserDoc", id);
            }
            const userDocDTO = userDocMapper.toDTO(userDoc);
            // search user by ID
            const user = await user_1.User.findByPk(userDocDTO.userId);
            if (!user) {
                throw new not_found_exception_1.NotFoundException("User", `${userDoc.userId}`);
            }
            // Update the user's verification status
            res.json(userDocDTO);
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
    async updateUserDoc(req, res) {
        const dto = new user_doc_request_dto_1.UserDocRequestDto(req.body);
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
                const userDoc = await user_doc_2.UserDoc.findByPk(id);
                if (!userDoc) {
                    throw new not_found_exception_1.NotFoundException("userDoc", `${id}`);
                }
                // search user by ID
                const user = await user_1.User.findByPk(userDoc.userId);
                if (!user) {
                    throw new not_found_exception_1.NotFoundException("User", `${userDoc.userId}`);
                }
                const obj = {
                    ...user_doc_1.emptyUserDoc,
                    ...req.body,
                    id: id,
                };
                const updatedUserDoc = await userDocUseCase.updateUserDoc(obj);
                const userDocDto = userDocMapper.toDTO(updatedUserDoc);
                res.json({
                    data: userDocDto,
                    message: "UserDoc Updated Successfully!",
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
    async deleteUserDoc(req, res) {
        try {
            const id = req.params.id;
            await userDocUseCase.deleteUserDoc(id);
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
exports.UserDocsController = UserDocsController;
