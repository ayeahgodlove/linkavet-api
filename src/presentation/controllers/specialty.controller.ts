import { Request, Response } from "express";
import {
  ISpecialty,
  ISpecialtyResponse,
} from "../../domain/models/specialty";
import { SpecialtyUseCase } from "../../domain/usecases/specialty.usecase";
import { SpecialtyRepository } from "../../data/repositories/impl/specialty.repository";
import { SpecialtyMapper } from "../mappers/mapper";
import { SpecialtyRequestDto } from "../dtos/specialty-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const specialtyRepository = new SpecialtyRepository();
const specialtyUseCase = new SpecialtyUseCase(specialtyRepository);
const specialtyMapper = new SpecialtyMapper();

export class SpecialtyController {
  async createSpecialty(
    req: Request,
    res: Response<ISpecialtyResponse>
  ): Promise<void> {
    const dto = new SpecialtyRequestDto(req.body);
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
        const SpecialtyResponse =
          await specialtyUseCase.createSpecialty({
            ...dto.toData(),
            fullname: req.body.fullname,
            title: req.body.title,
            website: req.body.website,
            yearsOfExperience: req.body.yearsOfExperience,
          });

        res.status(201).json({
          data: SpecialtyResponse.toJSON<ISpecialty>(),
          message: "Specialty created Successfully!",
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
      const Specialty = await specialtyUseCase.getAll();
      const SpecialtyDTO = specialtyMapper.toDTOs(Specialty);

      res.json({
        data: SpecialtyDTO,
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

  async getSpecialtyById(
    req: Request,
    res: Response<ISpecialtyResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const Specialty = await specialtyUseCase.getSpecialtyById(id);
      if (!Specialty) {
        throw new NotFoundException("Specialty", id);
      }
      const SpecialtyDTO = specialtyMapper.toDTO(Specialty);
      res.json({
        data: SpecialtyDTO,
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

  async updateSpecialty(
    req: Request,
    res: Response<ISpecialtyResponse>
  ): Promise<void> {
    const dto = new SpecialtyRequestDto(req.body);
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

        const obj: ISpecialty = {
          ...req.body,
          id: id,
          fullname: req.body.fullname,
          title: req.body.title,
          website: req.body.website,
          yearsOfExperience: req.body.yearsOfExperience,
        };
        const updatedSpecialty =
          await specialtyUseCase.updateSpecialty(obj);
        const SpecialtyDto =
        specialtyMapper.toDTO(updatedSpecialty);

        res.json({
          data: SpecialtyDto,
          message: "Specialty Updated Successfully!",
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

  async deleteSpecialty(
    req: Request,
    res: Response<ISpecialtyResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await specialtyUseCase.deleteSpecialty(id);

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
