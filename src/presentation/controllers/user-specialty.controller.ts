import { Request, Response } from "express";
import {
  IUserSpecialty,
  IUserSpecialtyResponse,
  emptyUserSpecialty,
} from "../../domain/models/user-specialty";
import { UserSpecialtyUseCase } from "../../domain/usecases/user-specialty.usecase";
import { UserSpecialtyRepository } from "../../data/repositories/impl/user-specialty.repository";
import { UserSpecialtyMapper } from "../mappers/mapper";
import { UserSpecialtyRequestDto } from "../dtos/user-specialty-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const userSpecialtyRepository = new UserSpecialtyRepository();
const userSpecialtyUseCase = new UserSpecialtyUseCase(userSpecialtyRepository);
const userSpecialtyMapper = new UserSpecialtyMapper();

export class UserSpecialtyController {
  async createUserSpecialty(
    req: Request,
    res: Response<IUserSpecialtyResponse>
  ): Promise<void> {
    const dto = new UserSpecialtyRequestDto(req.body);
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
        const userSpecialtyResponse =
          await userSpecialtyUseCase.createUserSpecialty({
            ...dto.toData(),
            fullname: req.body.fullname,
            title: req.body.title,
            website: req.body.website,
            yearsOfExperience: req.body.yearsOfExperience,
          });

        res.status(201).json({
          data: userSpecialtyResponse.toJSON<IUserSpecialty>(),
          message: "UserSpecialty created Successfully!",
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
      const userSpecialty = await userSpecialtyUseCase.getAll();
      const userSpecialtyDTO = userSpecialtyMapper.toDTOs(userSpecialty);

      res.json({
        data: userSpecialtyDTO,
        message: "Success",
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

  async getUserSpecialtyById(
    req: Request,
    res: Response<IUserSpecialtyResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const userSpecialty = await userSpecialtyUseCase.getUserSpecialtyById(id);
      if (!userSpecialty) {
        throw new NotFoundException("UserSpecialty", id);
      }
      const userSpecialtyDTO = userSpecialtyMapper.toDTO(userSpecialty);
      res.json({
        data: userSpecialtyDTO,
        message: "Success",
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

  async updateUserSpecialty(
    req: Request,
    res: Response<IUserSpecialtyResponse>
  ): Promise<void> {
    const dto = new UserSpecialtyRequestDto(req.body);
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

        const obj: IUserSpecialty = {
          ...req.body,
          id: id,
          fullname: req.body.fullname,
          title: req.body.title,
          website: req.body.website,
          yearsOfExperience: req.body.yearsOfExperience,
        };
        const updatedUserSpecialty =
          await userSpecialtyUseCase.updateUserSpecialty(obj);
        const userSpecialtyDto =
          userSpecialtyMapper.toDTO(updatedUserSpecialty);

        res.json({
          data: userSpecialtyDto,
          message: "UserSpecialty Updated Successfully!",
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

  async deleteUserSpecialty(
    req: Request,
    res: Response<IUserSpecialtyResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await userSpecialtyUseCase.deleteUserSpecialty(id);

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
