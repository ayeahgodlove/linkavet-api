import {
  IProduct,
  IProductResponse,
  IProductResponses,
  ProductFormData,
} from "models/product.model";
import { requestType } from "services";

export const ProductService = {
  list: (): Promise<IProductResponses> => requestType.get("/api/products"),
  details: (code: string): Promise<IProductResponse> =>
    requestType.get(`/api/products/${code}`),
  create: (user: FormData): Promise<IProductResponse> =>
    requestType.post(`/api/products`, user),
  update: (product: ProductFormData): Promise<IProductResponse> =>
    requestType.put(`/api/products/${product.id}`, product),
  delete: (product: IProduct): Promise<IProductResponse> =>
    requestType.del(`/api/products/${product.id}`, product),
  search: (value: string): Promise<IProduct[]> =>
    requestType.get(`/api/products/search/?searchTerm=${value}`),
};
