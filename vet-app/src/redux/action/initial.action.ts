import { fetchEvents } from "../event.slice";
import { fetchBannersAsync } from "../banner.slice";
import { fetchCategoriesAsync } from "../category.slice";
import { fetchDocumentsAsync } from "../document.slice";
import { fetchPostsAsync } from "../post.slice";
import { fetchProductsAsync } from "../product.slice";
import { fetchReviewsAsync } from "../review.slice";
import { AppThunk } from "../store";
import { fetchTagsAsync } from "../tag.slice";
import { fetchUserRolesAsync } from "../user-role.slice";
import { fetchUserSpecialtiesAsync } from "../user-specialty.slice";
import { fetchUsersAsync } from "../user.slice";

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
    dispatch(fetchEvents())
  } catch (error) {
    console.log(error);
  }
};
export const getConfiguration = (): AppThunk => async (dispatch) => {
  try {
    await dispatch(fetchUsersAsync());
    await dispatch(fetchCategoriesAsync());
    await dispatch(fetchTagsAsync());
    await dispatch(fetchBannersAsync());
    await dispatch(fetchReviewsAsync());
    await dispatch(fetchUserSpecialtiesAsync());
  } catch (error) {
    console.log(error);
  }
};