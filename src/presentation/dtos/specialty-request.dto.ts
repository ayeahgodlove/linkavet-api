// src/presentation/dtos/userSpecialty-request.dto.ts

import { IsNotEmpty, IsString } from "class-validator";
import {
  ISpecialty,
  emptySpecialty,
} from "../../domain/models/specialty";
import { nanoid } from "nanoid";

export class SpecialtyRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  specialty: string;

  @IsNotEmpty()
  @IsString()
  facebook: string;

  @IsNotEmpty()
  @IsString()
  linkedin: string;

  @IsNotEmpty()
  @IsString()
  twitter: string;

  constructor(data: ISpecialty) {
    this.userId = data.userId;
    this.specialty = data.specialty;
    (this.facebook = data.facebook),
      (this.linkedin = data.linkedin),
      (this.twitter = data.twitter);
  }

  toData(): ISpecialty {
    return {
      ...emptySpecialty,
      id: nanoid(15),
      userId: this.userId,
      specialty: this.specialty,
      facebook: this.facebook,
      linkedin: this.linkedin,
      twitter: this.twitter,
    };
  }

  toUpdateData(data: ISpecialty): ISpecialty {
    return {
      id: data.id,
      userId: data.userId,
      specialty: data.specialty,
      facebook: data.facebook,
      linkedin: data.linkedin,
      twitter: data.twitter,
      fullname: data.fullname,
      title: data.title,
      website: data.website,
      yearsOfExperience: data.yearsOfExperience,
    };
  }
}
