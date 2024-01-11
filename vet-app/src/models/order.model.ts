import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

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
  products: any[];
}

export const emptyOrder: IOrder = {
  id: "",
  status: "",
  orderNo: "",
  products: [],
  totalQtty: 0,
  totalAmount: 0,
  email: "",
  username: "",
  cellPhone: "",
  address: ""
};

export interface IOrderState extends IBaseState {
  readonly orders: IOrder[];
  readonly order: IOrder;
}

export interface IOrderResponses extends IResponseBase {
  data: IOrder[];
}
export interface IOrderResponse extends IResponseBase {
  data: IOrder;
}
