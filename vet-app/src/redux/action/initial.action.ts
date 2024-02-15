import { fetchBannersAsync } from "redux/banner.slice";
import { fetchCategoriesAsync } from "redux/category.slice";
import { fetchDocumentsAsync } from "redux/document.slice";
import { fetchPostsAsync } from "redux/post.slice";
import { fetchProductsAsync } from "redux/product.slice";
import { fetchReviewsAsync } from "redux/review.slice";
import { AppThunk } from "redux/store";
import { fetchTagsAsync } from "redux/tag.slice";
import { fetchUserRolesAsync } from "redux/user-role.slice";
import { fetchUsersAsync } from "redux/user.slice";

export const initialDataAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchTagsAsync());
    dispatch(fetchBannersAsync());
    dispatch(fetchReviewsAsync());
    dispatch(fetchProductsAsync());
    dispatch(fetchPostsAsync());
    dispatch(fetchUsersAsync());
    dispatch(fetchDocumentsAsync());
    dispatch(fetchUserRolesAsync())
  } catch (error) {
    console.log(error);
  }
};
export const getConfiguration = (): AppThunk => async (dispatch) => {
  try {
    await dispatch(fetchCategoriesAsync());
    await dispatch(fetchTagsAsync());
    await dispatch(fetchBannersAsync());
    await dispatch(fetchReviewsAsync());
  } catch (error) {
    console.log(error);
  }
};