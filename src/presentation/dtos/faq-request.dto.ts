// src/presentation/dtos/faq-request.dto.ts

import {  IsNotEmpty, IsString, Length } from "class-validator";
import { IFaq, emptyFaq } from "../../domain/models/faq";
import { nanoid } from "nanoid";
export class FaqRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  

  constructor(data: IFaq) {
    this.question = data.question;
    this.answer = data.answer;
  }

  toData(): IFaq {
    return {
      ...emptyFaq,
      id: nanoid(10),
      question: this.question,
      answer: this.answer,
    };
  }

  toUpdateData(data: IFaq): IFaq {
    return {
      id: data.id,
      question: data.question,
      answer: data.answer,
    }
  }
}
