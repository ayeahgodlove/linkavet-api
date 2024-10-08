import { Request, Response } from "express";
import {
  IDocument,
  IDocumentResponse,
  emptyDocument,
} from "../../domain/models/document";
import { DocumentUseCase } from "../../domain/usecases/document.usecase";
import { DocumentRepository } from "../../data/repositories/impl/document.repository";
import { DocumentMapper } from "../mappers/mapper";
import { DocumentRequestDto } from "../dtos/document-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { User } from "../../data/entities/user";
import { deleteFile } from "../../utils/util";

const documentRepository = new DocumentRepository();
const documentUseCase = new DocumentUseCase(documentRepository);
const documentMapper = new DocumentMapper();

export class DocumentsController {
  async createDocument(
    req: Request,
    res: Response<IDocumentResponse>
  ): Promise<void> {
    const dto = new DocumentRequestDto(req.body);
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
        const documentResponse = await documentUseCase.createDocument({
          ...dto.toData(),
          userId: user.id,
          fileUrl: req.body.fileUrl,
        });

        res.status(201).json({
          data: documentResponse.toJSON<IDocument>(),
          message: "Document created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        deleteFile(req.body.fileUrl, "documents");
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
      const documents = await documentUseCase.getAll();
      const documentsDTO = documentMapper.toDTOs(documents);

      res.json(documentsDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getDocumentById(req: Request, res: Response<any>): Promise<void> {
    try {
      const id = req.params.id;

      const document = await documentUseCase.getDocumentById(id);
      if (!document) {
        throw new NotFoundException("Document", id);
      }
      const documentDTO = documentMapper.toDTO(document);
      res.json(documentDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateDocument(
    req: Request,
    res: Response<IDocumentResponse>
  ): Promise<void> {
    const dto = new DocumentRequestDto(req.body);
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
        const id = req.params.id;

        const obj: IDocument = {
          ...emptyDocument,
          ...req.body,
          id: id,
          userId: user.id,
          fileUrl: req.body.fileUrl,
        };
        const updatedDocument = await documentUseCase.updateDocument(obj);
        const documentDto = documentMapper.toDTO(updatedDocument);

        res.json({
          data: documentDto,
          message: "Document Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        deleteFile(req.body.fileUrl, "documents");
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteDocument(
    req: Request,
    res: Response<IDocumentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const document = await documentUseCase.getDocumentById(id);
      if (document) {
        deleteFile(document.dataValues.fileUrl, "documents");
      }

      await documentUseCase.deleteDocument(id);

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
