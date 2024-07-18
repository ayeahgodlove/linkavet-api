import { Request, Response } from "express";
import {
  IContact,
  IContactResponse,
  emptyContact,
} from "../../domain/models/contact";
import { ContactUseCase } from "../../domain/usecases/contact.usecase";
import { ContactRepository } from "../../data/repositories/impl/contact.repository";
import { ContactMapper } from "../mappers/mapper";
import { ContactRequestDto } from "../dtos/contact-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const contactRepository = new ContactRepository();
const contactUseCase = new ContactUseCase(contactRepository);
const contactMapper = new ContactMapper();

export class ContactsController {
  async createContact(
    req: Request,
    res: Response<IContactResponse>
  ): Promise<void> {
    const dto = new ContactRequestDto(req.body);
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
        const contactResponse = await contactUseCase.createContact(
          dto.toData()
        );

        res.status(201).json({
          data: contactResponse.toJSON<IContact>(),
          message: "Contact created Successfully!",
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
      const contactes = await contactUseCase.getAll();
      const contactsDTO = contactMapper.toDTOs(contactes);

      res.json(contactsDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getContactById(req: Request, res: Response<any>): Promise<void> {
    try {
      const id = req.params.id;

      const contact = await contactUseCase.getContactById(id);
      if (!contact) {
        throw new NotFoundException("Contact", id);
      }
      const contactDTO = contactMapper.toDTO(contact);
      res.json(contactDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateContact(
    req: Request,
    res: Response<IContactResponse>
  ): Promise<void> {
    const dto = new ContactRequestDto(req.body);
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

        const obj: IContact = {
          ...emptyContact,
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

  async deleteContact(
    req: Request,
    res: Response<IContactResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await contactUseCase.deleteContact(id);

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
