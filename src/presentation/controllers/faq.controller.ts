import { Request, Response } from "express";
import { IFaq, IFaqResponse, emptyFaq } from "../../domain/models/faq";
import { FaqUseCase } from "../../domain/usecases/faq.usecase";
import { FaqRepository } from "../../data/repositories/impl/faq.repository";
import { FaqMapper } from "../mappers/mapper";
import { FaqRequestDto } from "../dtos/faq-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { User } from "../../data/entities/user";

const faqRepository = new FaqRepository();
const faqUseCase = new FaqUseCase(faqRepository);
const faqMapper = new FaqMapper();

export class FaqsController {
  async createFaq(req: Request, res: Response<IFaqResponse>): Promise<void> {
    const dto = new FaqRequestDto(req.body);
    const validationErrors = await validate(dto);

    const user = req.user as User;

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const faqResponse = await faqUseCase.createFaq({
          ...dto.toData(),
        });

        res.status(201).json({
          data: faqResponse.toJSON<IFaq>(),
          message: "Faq created Successfully!",
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
      const faqs = await faqUseCase.getAll();
      const faqsDTO = faqMapper.toDTOs(faqs);

      res.json(faqsDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getFaqById(req: Request, res: Response<any>): Promise<void> {
    try {
      const id = req.params.id;

      const faq = await faqUseCase.getFaqById(id);
      if (!faq) {
        throw new NotFoundException("Faq", id);
      }
      const faqDTO = faqMapper.toDTO(faq);
      res.json(faqDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateFaq(req: Request, res: Response<IFaqResponse>): Promise<void> {
    const dto = new FaqRequestDto(req.body);
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

        const obj: IFaq = {
          ...emptyFaq,
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

  async deleteFaq(req: Request, res: Response<IFaqResponse>): Promise<void> {
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
