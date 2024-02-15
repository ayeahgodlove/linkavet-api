"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesController = void 0;
const user_role_1 = require("../../domain/models/user-role");
const user_role_usecase_1 = require("../../domain/usecases/user-role.usecase");
const user_role_repository_1 = require("../../data/repositories/impl/user-role.repository");
const mapper_1 = require("../mappers/mapper");
const user_role_request_dto_1 = require("../dtos/user-role-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const userRoleRepository = new user_role_repository_1.UserRoleRepository();
const userRoleUseCase = new user_role_usecase_1.UserRoleUseCase(userRoleRepository);
const userRoleMapper = new mapper_1.UserRoleMapper();
class UserRolesController {
    async createUserRole(req, res) {
        const dto = new user_role_request_dto_1.UserRoleRequestDto(req.body);
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
                const userRoleResponse = await userRoleUseCase.createUserRole(dto.toData());
                res.status(201).json({
                    data: userRoleResponse.toJSON(),
                    message: "UserRole created Successfully!",
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
            const userRoles = await userRoleUseCase.getAll();
            const userRolesDTO = userRoleMapper.toDTOs(userRoles);
            res.json({
                data: userRolesDTO,
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
    async getUserRoleById(req, res) {
        try {
            const id = req.params.id;
            const userRole = await userRoleUseCase.getUserRoleById(id);
            if (!userRole) {
                throw new not_found_exception_1.NotFoundException("UserRole", id);
            }
            const userRoleDTO = userRoleMapper.toDTO(userRole);
            res.json({
                data: userRoleDTO,
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
    async updateUserRole(req, res) {
        const dto = new user_role_request_dto_1.UserRoleRequestDto(req.body);
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
                    ...user_role_1.emptyUserRole,
                    ...req.body,
                    id: id,
                };
                const updatedUserRole = await userRoleUseCase.updateUserRole(obj);
                const userRoleDto = userRoleMapper.toDTO(updatedUserRole);
                res.json({
                    data: userRoleDto,
                    message: "UserRole Updated Successfully!",
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
    async deleteUserRole(req, res) {
        try {
            const id = req.params.id;
            await userRoleUseCase.deleteUserRole(id);
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
exports.UserRolesController = UserRolesController;
