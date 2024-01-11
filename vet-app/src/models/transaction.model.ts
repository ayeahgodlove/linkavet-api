import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export enum TRANSACTION_STATUS {
  PENDING,
  SUCCESSFUL,
  FAILED,
}
export interface ITransactionVm {
  reference: string;
  status: TRANSACTION_STATUS;
  amount: number;
  currency: string;
  operator: string;
  code: string;
  operator_reference: string;
  description: string;
}


export const emptyTransactionVm: ITransactionVm = {
  code: "",
  operator: "",
  description: "",
  amount: 0,
  reference: "",
  status: TRANSACTION_STATUS.PENDING,
  currency: "",
  operator_reference: ""
};

export interface ITransactionVmState extends IBaseState {
  readonly transactionHistories: ITransactionVm[];
  readonly transactionVm: ITransactionVm;
}

export interface ITransactionVmResponse extends IResponseBase {
  data: ITransactionVm;
}

export interface ITransactionVmResponses extends IResponseBase {
  data: ITransactionVm[];
}
