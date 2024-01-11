import {
  ICategory,
  ICategoryResponse,
  ICategoryResponses,
} from "models/category.model";
import { requestType } from "services";

export const CategoryService = {
  list: (): Promise<ICategoryResponses> => requestType.get("/api/categories"),
  details: (code: string): Promise<ICategoryResponse> =>
    requestType.get(`/api/categories/${code}`),
  create: (category: ICategory): Promise<ICategoryResponse> =>
    requestType.post(`/api/categories`, category),
  update: (category: ICategory): Promise<ICategoryResponse> =>
    requestType.put(`/api/categories/${category.id}`, category),
  delete: (category: ICategory): Promise<ICategoryResponse> =>
    requestType.del(`/api/categories/${category.id}`, category),
};
