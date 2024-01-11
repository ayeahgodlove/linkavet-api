import {
  ISubCategory,
  ISubCategoryResponse,
  ISubCategoryResponses,
} from "models/category.model";
import { requestType } from "services";

export const SubCategoryService = {
  list: (): Promise<ISubCategoryResponses> =>
    requestType.get("/api/sub-categories"),
  details: (code: string): Promise<ISubCategoryResponse> =>
    requestType.get(`/api/sub-categories/${code}`),
  create: (user: ISubCategory): Promise<ISubCategoryResponse> =>
    requestType.post(`/api/sub-categories`, user),
  update: (subCategory: ISubCategory): Promise<ISubCategoryResponse> =>
    requestType.put(`/api/sub-categories/${subCategory.id}`, subCategory),
  delete: (subCategory: ISubCategory): Promise<ISubCategoryResponse> =>
    requestType.del(`/api/sub-categories/${subCategory.id}`, subCategory),
};
