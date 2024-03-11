import { IBaseResponse } from "./base-response";

export interface IProductOrder {
  orderId: string;
  productId: string,
  qtty: number;
  amount: number;
}

export const emptyProductOrder: IProductOrder = {
  orderId: "",
  productId: "",
  qtty: 0,
  amount: 0
};

export interface IProductOrderResponse extends IBaseResponse {
  data: IProductOrder | null | IProductOrder[];
}
