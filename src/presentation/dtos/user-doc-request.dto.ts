// src/presentation/dtos/userDoc-request.dto.ts

import { IsNotEmpty, IsString, IsBoolean } from "class-validator";
import { IUserDoc, emptyUserDoc } from "../../domain/models/user-doc";
import { nanoid } from "nanoid";
export class UserDocRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  idCard: string;

  @IsNotEmpty()
  @IsString()
  license: string;

  @IsNotEmpty()
  @IsString()
  diploma: string;

  @IsBoolean()
  verified: boolean;

  constructor(data: IUserDoc) {
    this.userId = data.userId;
    this.photo = data.photo;
    this.idCard = data.idCard;
    this.license = data.license;
    this.diploma = data.diploma;
    this.verified = data.verified;
  }

  toData(): IUserDoc {
    return {
      ...emptyUserDoc,
      id: nanoid(10),
      userId: this.userId,
      photo: this.photo,
      idCard: this.idCard,
      license: this.license,
      diploma: this.diploma,
      verified: this.verified,
    };
  }

  toUpdateData(data: IUserDoc): IUserDoc {
    return {
      id: data.id,
      userId: data.userId,
      photo: data.photo,
      idCard: data.idCard,
      license: data.license,
      diploma: data.diploma,
      verified: data.verified,
    };
  }
}
