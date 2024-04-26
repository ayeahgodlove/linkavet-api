// src/presentation/dtos/userSpecialty-request.dto.ts

import { IsNotEmpty, IsString } from "class-validator";
import {
  IUserSpecialty,
  emptyUserSpecialty,
} from "../../domain/models/user-specialty";
import { nanoid } from "nanoid";

export class UserSpecialtyRequestDto {
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

  constructor(data: IUserSpecialty) {
    this.userId = data.userId;
    this.specialty = data.specialty;
    (this.facebook = data.facebook),
      (this.linkedin = data.linkedin),
      (this.twitter = data.twitter);
  }

  toData(): IUserSpecialty {
    return {
      ...emptyUserSpecialty,
      id: nanoid(15),
      userId: this.userId,
      specialty: this.specialty,
      facebook: this.facebook,
      linkedin: this.linkedin,
      twitter: this.twitter,
    };
  }

  toUpdateData(data: IUserSpecialty): IUserSpecialty {
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
