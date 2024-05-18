// src/presentation/dtos/mail-request.dto.ts

import { IsNotEmpty, IsString, IsArray } from "class-validator";
import { IMail, emptyMail } from "../../domain/models/mail";
import { nanoid } from "nanoid";
import { MAIL_STATUS } from "../../domain/models/shared/status.enum";

export class MailRequestDto {
  @IsNotEmpty()
  @IsString()
  senderEmail: string;

  @IsNotEmpty()
  @IsArray()
  receiverEmails: string[];

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  headline: string;

  @IsNotEmpty()
  @IsString()
  status: MAIL_STATUS;

  @IsNotEmpty()
  @IsString()
  cta: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  constructor(data: IMail) {
    this.senderEmail = data.senderEmail;
    this.receiverEmails = data.receiverEmails;
    this.type = data.type;
    this.headline = data.headline;
    this.status = data.status;
    this.cta = data.cta;
    this.content = data.content;
  }

  toData(): IMail {
    return {
      ...emptyMail,
      id: nanoid(10),
      senderEmail: this.senderEmail,
      receiverEmails: this.receiverEmails,
      type: this.type,
      headline: this.headline,
      status: this.status,
      cta: this.cta,
      content: this.content,
    };
  }

  toUpdateData(data: IMail): IMail {
    return {
      id: data.id,
      senderEmail: data.senderEmail,
      receiverEmails: data.receiverEmails,
      content: data.content,
      cta: data.cta,
      headline: data.headline,
      status: data.status,
      type: data.type,
      media: data.media,
    };
  }
}
