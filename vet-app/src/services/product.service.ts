import {
  IProduct,
  IProductResponse,
  IProductResponses,
} from "models/product.model";
import { requestType } from "services";

export const ProductService = {
  list: (): Promise<IProductResponses> => requestType.get("/api/products"),
  details: (code: string): Promise<IProductResponse> =>
    requestType.get(`/api/products/${code}`),
  create: (user: IProduct): Promise<IProductResponse> =>
    requestType.post(`/api/products`, user),
  update: (product: IProduct): Promise<IProductResponse> =>
    requestType.put(`/api/products/${product.id}`, product),
  delete: (product: IProduct): Promise<IProductResponse> =>
    requestType.del(`/api/products/${product.id}`, product),
  search: (value: string): Promise<IProduct[]> =>
    requestType.get(`/api/products/search/?searchTerm=${value}`),
};
