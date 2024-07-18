import { IBaseResponse } from "./base-response";
import { IOrder } from "./order";
import { IReview } from "./review";

export interface IProduct {
  id: string;
  name: string;
  amount: number;
  description: string;
  categoryId: string;
  shortDescription: string;
  productImages: string[];
  qtty: number;
  tags: string[]
  
  availabilityStatus: string;
  rating: number;
  discountPercentage: number;
}

export const emptyProduct: IProduct = {
  id: "",
  name: "",
  amount: 0,
  description: "",
  categoryId: "",
  productImages: [],
  shortDescription: "",
  qtty: 0,
  tags: [],

  availabilityStatus: "",
  rating: 0,
  discountPercentage: 0
};

export interface IProductResponse extends IBaseResponse {
  data: IProduct | null | IProduct[];
}
