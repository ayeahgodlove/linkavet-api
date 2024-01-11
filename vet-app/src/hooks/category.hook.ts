import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { ICategory, emptyCategory } from "models/category.model";
import {
  addCategorySuccess,
  editCategorySuccess,
  fetchCategoriesAsync,
  setActiveCategory,
} from "../redux/category.slice";
import { CategoryService } from "services/category.service";
import { useFormErrors } from "./shared/form-error.hook";
const useCategory = () => {
  const categories = useSelector<IRootState, ICategory[]>((state) => state.category.categories);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.category.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.category.initialFetch
  );
  const category = useSelector<IRootState, ICategory>((state) => state.category.category);

  const dispatch = useDispatch();
  const { setformError } = useFormErrors()

  const loadCategories = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchCategoriesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addCategory = async (category: ICategory) => {
    return await CategoryService.create(category)
      .then((categoryResponse) => {
        dispatch(addCategorySuccess(categoryResponse.data));
        return true;
      }) 
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const setCategory = (category: ICategory) => {
    dispatch(setActiveCategory(category));
  };

  const editCategory = async (category: ICategory) => {
    return await CategoryService.update(category)
      .then((categoryResponse) => {
        dispatch(editCategorySuccess(categoryResponse.data));
        setCategory(categoryResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const getCategory = useCallback((categoryId: string) => {
      const category = categories.find(c => c.id === categoryId);

      if(!category) {
        return emptyCategory;
      }
      return category;
  }, []) 
  useEffect(() => {
    // loadCategories();
  }, [category, categories, isLoading, initialFetch, loadCategories]);

  return {
    category,
    categories,
    isLoading,
    initialFetch,
    addCategory,
    editCategory,
    setCategory,
    getCategory
  };
};

export { useCategory };
