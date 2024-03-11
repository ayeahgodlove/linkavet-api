// src/presentation/dtos/PaymentRequestDto.ts

import {  IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { IPayment, emptyPayment } from "../../domain/models/payment";
import { v4 } from "uuid";

// status: string;
export class PaymentRequestDto {
  @IsNotEmpty()
  @IsString()
  orderNo: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  email:string;

  @IsNotEmpty()
  @IsString()
  username:string;

  @IsNotEmpty()
  @IsString()
  cellPhone:string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  amount: number;
 
  constructor(data: IPayment) {
    this.orderNo = data.orderNo;
    this.status = data.status;
    this.cellPhone = data.cellPhone;
    this.address = data.address;
    this.email = data.email;
    this.username = data.username;
    this.amount = data.amount;
  }

  toData(): IPayment {
    return {
      ...emptyPayment,
      id: v4(),
      orderNo: this.orderNo,
      status: this.status,
      amount: this.amount,
      cellPhone: this.cellPhone,
      address: this.address,
      email: this.email,
      username: this.username,
    };
  }

  toUpdateData(data: IPayment): IPayment {
    return {
      id: data.id,
      amount: data.amount,
      userId: data.userId,
      orderNo: data.orderNo,
      status: data.status,
      address: data.address,
      cellPhone: data.cellPhone,
      email: data.email,
      username: data.username
    }
  }
}
