import { fetchCategoriesAsync } from "redux/category.slice";
import { fetchDocumentsAsync } from "redux/document.slice";
import { fetchPostsAsync } from "redux/post.slice";
import { fetchProductsAsync } from "redux/product.slice";
import { AppThunk } from "redux/store";
import { fetchUsersAsync } from "redux/user.slice";

export const initialDataAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchPostsAsync());
    dispatch(fetchUsersAsync());
    dispatch(fetchDocumentsAsync());
  } catch (error) {
    console.log(error);
  }
};
