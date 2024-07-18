import { IBaseResponse } from "./base-response";

export interface ICartItem {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export const emptyCartItem: ICartItem = {
  id: "",
  productId: "",
  quantity: 0,
  total: 0,
  discountPercentage: 0,
  discountedPrice: 0,
  userId: "",
};

export interface ICartItemResponse extends IBaseResponse {
  data: ICartItem | null | ICartItem[];
}
