// src/presentation/dtos/contact-request.dto.ts

import { IsNotEmpty, IsString } from "class-validator";
import { IContact, emptyContact } from "../../domain/models/contact";
import slugify from "slugify";
import { nanoid } from "nanoid";
export class ContactRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  constructor(data: IContact) {
    this.name = data.name;
    this.subject = data.subject;
    this.message = data.message;
    this.email = data.email;
  }

  toData(): IContact {
    return {
      ...emptyContact,
      id: nanoid(10),
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
    };
  }

  toUpdateData(data: IContact): IContact {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
  }
}
