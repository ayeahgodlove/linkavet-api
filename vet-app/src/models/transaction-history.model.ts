import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface ITransactionHistory {
  datetime: Date;
  code: string;
  operator_tx_code: string;
  operator: string;
  phone_number: string;
  description: string;
  external_user: string;
  amount: number;
  charge_amount: number;
  debit: number;
  credit: number;
  status: string;
  reference_uuid: string;
}

export const emptyTransactionHistory: ITransactionHistory = {
  datetime: new Date(),
  code: "",
  operator_tx_code: "",
  operator: "",
  phone_number: "",
  description: "",
  external_user: "",
  amount: 0,
  charge_amount: 0,
  debit: 0,
  credit: 0,
  status: "",
  reference_uuid: "",
};

export interface ITransactionHistoryState extends IBaseState {
  readonly transactionHistories: ITransactionHistory[];
  readonly transactionHistory: ITransactionHistory;
}

export interface ITransactionHistoryResponse extends IResponseBase {
  data: ITransactionHistory;
}

export interface ITransactionHistoryResponses extends IResponseBase {
  data: ITransactionHistory[];
}
