import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IPayment {
  id: string;
  userId?: string;
  orderNo: string;
  email:string;
  username:string;
  cellPhone:string;
  address: string;
  amount: number;
  status: string;
}

export const emptyPayment: IPayment = {
  id: "",
  orderNo: "",
  amount: 0,
  status: "",
  email: "",
  username: "",
  cellPhone: "",
  address: ""
};

export interface IPaymentState extends IBaseState {
  readonly payments: IPayment[];
  readonly payment: IPayment;
}

export interface IPaymentResponse extends IResponseBase {
  data: IPayment
}
export interface IPaymentResponses extends IResponseBase {
  data: IPayment[]
}