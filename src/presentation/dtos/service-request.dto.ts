// src/presentation/dtos/service-request.dto.ts

import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IService, emptyService } from "../../domain/models/service";
import slugify from "slugify";
import { nanoid } from "nanoid";

export class ServiceRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  short_description: string;

  @IsNumber()
  price: number;

  constructor(data: IService) {
    this.title = data.title;
    this.description = data.description;
    this.fileName = data.fileName;
    this.price = data.price;
    this.short_description = data.short_description
  }

  toData(): IService {
    return {
      ...emptyService,
      id: nanoid(10),
      slug: slugify(this.title, { lower: true, replacement: "-" }),
      title: this.title,
      description: this.description,
      fileName: this.fileName,
      price: this.price,
      short_description: this.short_description
    };
  }

  toUpdateData(data: IService): IService {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      fileName: data.fileName,
      price: data.price,
      slug: data.slug,
      short_description: data.short_description,
      
    };
  }
}
