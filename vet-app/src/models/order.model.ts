import { IBaseState } from "./base-state.model";
import { IProduct } from "./product.model";
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
  createdAt?: Date
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
  readonly productOrders: IProduct[]
}

export interface IOrderResponses extends IResponseBase {
  data: IOrder[];
}
export interface IOrderResponse extends IResponseBase {
  data: IOrder;
}
