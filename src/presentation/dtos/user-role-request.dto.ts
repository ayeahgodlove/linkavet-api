// src/presentation/dtos/userRole-request.dto.ts

import {  IsNotEmpty, IsString } from "class-validator";
import { IUserRole, emptyUserRole } from "../../domain/models/user-role";

export class UserRoleRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;


  constructor(data: IUserRole) {
    this.userId = data.userId;
    this.roleId = data.roleId;
  }

  toData(): IUserRole {
    return {
      ...emptyUserRole,
      userId: this.userId,
      roleId: this.roleId,
    };
  }

  toUpdateData(data: IUserRole): IUserRole {
    return {
      userId: data.userId,
      roleId: data.roleId,
    }
  }
}
