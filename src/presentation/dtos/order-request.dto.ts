// src/presentation/dtos/OrderRequestDto.ts

import { IsNotEmpty, IsString } from "class-validator";
import { IOrder, emptyOrder } from "../../domain/models/order";
import { v4 } from "uuid";

export class OrderRequestDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  orderNo: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  cellPhone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  totalAmount: number;

  @IsNotEmpty()
  totalQtty: number;

  products:string[];

  constructor(data: IOrder) {
    this.status = data.status;
    this.orderNo = data.orderNo;
    this.totalAmount = data.totalAmount;
    this.totalQtty = data.totalQtty;
    this.products = data.products;
    this.cellPhone = data.cellPhone;
    this.address = data.address;
    this.email = data.email;
    this.username = data.username;
  }

  toData(): IOrder {
    return {
      ...emptyOrder,
      id: v4(),
      orderNo: this.orderNo,
      status: this.status,
      totalAmount: this.totalAmount,
      totalQtty: this.totalQtty,
      products: this.products,
      cellPhone: this.cellPhone,
      address: this.address,
      email: this.email,
      username: this.username,
    };
  }

  toUpdateData(data: IOrder): IOrder {
    return {
      id: data.id,
      orderNo: data.orderNo,
      status: data.status,
      totalAmount: data.totalAmount,
      userId: data.userId,
      totalQtty: data.totalQtty,
      products: data.products,
      address: data.address,
      cellPhone: data.cellPhone,
      email: data.email,
      username: data.username
    };
  }
}
