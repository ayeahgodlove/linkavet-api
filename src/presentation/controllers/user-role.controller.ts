import { Request, Response } from "express";
import {
  IUserRole,
  IUserRoleResponse,
  emptyUserRole,
} from "../../domain/models/user-role";
import { UserRoleUseCase } from "../../domain/usecases/user-role.usecase";
import { UserRoleRepository } from "../../data/repositories/impl/user-role.repository";
import { UserRoleMapper } from "../mappers/mapper";
import { UserRoleRequestDto } from "../dtos/user-role-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const userRoleRepository = new UserRoleRepository();
const userRoleUseCase = new UserRoleUseCase(userRoleRepository);
const userRoleMapper = new UserRoleMapper();

export class UserRolesController {
  async createUserRole(
    req: Request,
    res: Response<IUserRoleResponse>
  ): Promise<void> {
    const dto = new UserRoleRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const userRoleResponse = await userRoleUseCase.createUserRole(
          dto.toData()
        );

        res.status(201).json({
          data: userRoleResponse.toJSON<IUserRole>(),
          message: "UserRole created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const userRoles = await userRoleUseCase.getAll();
      const userRolesDTO = userRoleMapper.toDTOs(userRoles);

      res.json(userRolesDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getUserRoleById(
    req: Request,
    res: Response<any>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const userRole = await userRoleUseCase.getUserRoleById(id);
      if (!userRole) {
        throw new NotFoundException("UserRole", id);
      }
      const userRoleDTO = userRoleMapper.toDTO(userRole);
      res.json(userRoleDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateUserRole(
    req: Request,
    res: Response<IUserRoleResponse>
  ): Promise<void> {
    const dto = new UserRoleRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: IUserRole = {
          ...emptyUserRole,
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
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteUserRole(
    req: Request,
    res: Response<IUserRoleResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await userRoleUseCase.deleteUserRole(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}
