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

  constructor(data: IUserSpecialty) {
    this.userId = data.userId;
    this.specialty = data.specialty;
  }

  toData(): IUserSpecialty {
    return {
      ...emptyUserSpecialty,
      id: nanoid(15),
      userId: this.userId,
      specialty: this.specialty,
    };
  }

  toUpdateData(data: IUserSpecialty): IUserSpecialty {
    return {
      id: data.id,
      userId: data.userId,
      specialty: data.specialty,
    };
  }
}
