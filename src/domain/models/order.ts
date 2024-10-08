import { IBaseResponse } from "./base-response";

export interface IOrder {
  id: string;
  userId?: string;
  totalQtty: number;
  totalAmount: number;
  status: string;
  orderNo: string;
  email:string;
  username:string;
  cellPhone:string;
  address: string;
  products: string[]
  discount?: number;
} 

export const emptyOrder: IOrder = {
  id: "",
  totalQtty: 0,
  totalAmount: 0,
  status: "",
  orderNo: "",
  products: [],
  email: "",
  username: "",
  cellPhone: "",
  address: ""
};

export interface IOrderResponse extends IBaseResponse {
  data: IOrder | null | IOrder[];
}
