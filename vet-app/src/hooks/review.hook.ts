import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IReview } from "models/review.model";
import {
  addReviewSuccess,
  editReviewSuccess,
  fetchReviewsAsync,
  setActiveReview,
} from "../redux/review.slice";
import { ReviewService } from "services/review.service";
import { useFormErrors } from "./shared/form-error.hook";
const useReview = () => {
  const reviews = useSelector<IRootState, IReview[]>(
    (state) => state.review.reviews
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.review.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.review.initialFetch
  );
  const review = useSelector<IRootState, IReview>(
    (state) => state.review.review
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadReviews = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchReviewsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addReview = async (review: IReview) => {
    return await ReviewService.create(review)
      .then((reviewResponse) => {
        dispatch(addReviewSuccess(reviewResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setReview = (review: IReview) => {
    dispatch(setActiveReview(review));
  };

  const editReview = async (review: IReview) => {
    return await ReviewService.update(review)
      .then((reviewResponse) => {
        dispatch(editReviewSuccess(reviewResponse.data));
        setReview(reviewResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  useEffect(() => {
    // loadReviews();
  }, [review, reviews, isLoading, initialFetch, loadReviews]);

  return {
    review,
    reviews,
    isLoading,
    initialFetch,
    addReview,
    editReview,
    setReview,
  };
};

export { useReview };
