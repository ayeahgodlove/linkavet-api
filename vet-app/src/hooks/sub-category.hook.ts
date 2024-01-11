import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { ISubCategory } from "models/category.model";
import {
  addSubCategorySuccess,
  editSubCategorySuccess,
  fetchSubCategoriesAsync,
  setActiveSubCategory,
} from "../redux/sub-category.slice";
import { SubCategoryService } from "services/sub-category.service";
import { useFormErrors } from "./shared/form-error.hook";
const useSubCategory = () => {
  const subCategories = useSelector<IRootState, ISubCategory[]>((state) => state.subCategory.subCategories);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.subCategory.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.subCategory.initialFetch
  );
  const subCategory = useSelector<IRootState, ISubCategory>((state) => state.subCategory.subCategory);

  const dispatch = useDispatch();
  const { setformError } = useFormErrors()

  const loadSubCategories = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchSubCategoriesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addSubCategory = async (subCategory: ISubCategory) => {
    return await SubCategoryService.create(subCategory)
      .then((subCategoryResponse) => {
        dispatch(addSubCategorySuccess(subCategoryResponse.data));
        return true;
      }) 
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const setSubCategory = (subCategory: ISubCategory) => {
    dispatch(setActiveSubCategory(subCategory));
  };

  const editSubCategory = async (subCategory: ISubCategory) => {
    return await SubCategoryService.update(subCategory)
      .then((subCategoryResponse) => {
        dispatch(editSubCategorySuccess(subCategoryResponse.data));
        setSubCategory(subCategoryResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  useEffect(() => {
    loadSubCategories();
  }, [subCategory, subCategories, isLoading, initialFetch, loadSubCategories]);

  return {
    subCategory,
    subCategories,
    isLoading,
    initialFetch,
    addSubCategory,
    editSubCategory,
    setSubCategory,
  };
};

export { useSubCategory };
