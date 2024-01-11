import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

// name, description, "createdAt", "updatedAt", "deletedAt", qtty, "shortDescription", amount, "categoryId
export interface IProduct {
  id: string;
  name: string;
  amount: number;
  description: string;
  categoryId: string;
  storeId: string;
  shortDescription: string;
  productImages: any[];
  qtty: number;
  reviews: any[];
  tags: any[];
  orders: any[];
}

export interface ProductFormData extends FormData {
  id: string; // Assuming the ID is a string, adjust the type as needed
}

export const emptyProduct: IProduct = {
  id: "",
  name: "",
  amount: 0,
  description: "",
  categoryId: "",
  storeId: "",
  shortDescription: "",
  productImages: [],
  qtty: 0,
  reviews: [],
  tags: [],
  orders: [],
};

export interface IProductState extends IBaseState {
  readonly products: IProduct[];
  readonly product: IProduct;
}

export interface IProductResponses extends IResponseBase {
  data: IProduct[];
}
export interface IProductResponse extends IResponseBase {
  data: IProduct;
}
