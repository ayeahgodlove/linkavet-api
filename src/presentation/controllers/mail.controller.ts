import { Request, Response } from "express";
import { IMail, IMailResponse, emptyMail } from "../../domain/models/mail";
import { MailUseCase } from "../../domain/usecases/mail.usecase";
import { MailRepository } from "../../data/repositories/impl/mail.repository";
import { MailMapper } from "../mappers/mapper";
import { MailRequestDto } from "../dtos/mail-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const mailRepository = new MailRepository();
const mailUseCase = new MailUseCase(mailRepository);
const mailMapper = new MailMapper();

export class MailsController {
  async createMail(req: Request, res: Response<IMailResponse>): Promise<void> {
    const dto = new MailRequestDto(req.body);
    const validationErrors = await validate(dto);
    const media = req.body.media;

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const mailResponse = await mailUseCase.createMail({
          ...dto.toData(),
          media,
        });

        res.status(201).json({
          data: mailResponse.toJSON<IMail>(),
          message: "Mail created Successfully!",
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
      const mails = await mailUseCase.getAll();
      const mailsDTO = mailMapper.toDTOs(mails);

      res.json(mailsDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getMailById(req: Request, res: Response<any>): Promise<void> {
    try {
      const id = req.params.id;

      const mail = await mailUseCase.getMailById(id);
      if (!mail) {
        throw new NotFoundException("Mail", id);
      }
      const mailDTO = mailMapper.toDTO(mail);
      res.json(mailDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateMail(req: Request, res: Response<IMailResponse>): Promise<void> {
    const dto = new MailRequestDto(req.body);
    const validationErrors = await validate(dto);
    const media = req.body.media;

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

        const obj: IMail = {
          ...emptyMail,
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

  async deleteMail(req: Request, res: Response<IMailResponse>): Promise<void> {
    try {
      const id = req.params.id;

      await mailUseCase.deleteMail(id);

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
