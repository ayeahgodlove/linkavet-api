import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewService } from "services/review.service";
import { IReviewState, emptyReview, IReview, IReviewResponse, IReviewResponses } from "../models/review.model";

export const initialState: IReviewState = {
  reviews: [],
  errors: "",
  review: emptyReview,
  isLoading: false,
  initialFetch: true,
};

export const fetchReviewsAsync = createAsyncThunk<IReviewResponses, void>(
  "review/fetchReviewsAsync",
  async (_, thunkApi) => {
    try {
      return await ReviewService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    fetchreviewRequest: (state) => {
      state.isLoading = true;
    },
    fetchreviewSuccess: (state, action: PayloadAction<IReview[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.reviews = action.payload;
    },
    fetchreviewError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editReviewSuccess: (state, action: PayloadAction<IReview>) => {
      state.reviews = state.reviews.map((review) => {
        return review.id === action.payload.id ? action.payload : review;
      });
    },
    addReviewSuccess: (state, action: PayloadAction<IReview>) => {
      state.reviews = [...state.reviews, action.payload];
    },
    setActiveReview: (state, action: PayloadAction<IReview>) => {
      state.review = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviewsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReviewsAsync.fulfilled, (state, action: PayloadAction<IReviewResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.reviews = action.payload.data;
    });
    builder.addCase(fetchReviewsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchreviewRequest,
  fetchreviewSuccess,
  fetchreviewError,
  editReviewSuccess,
  addReviewSuccess,
  setActiveReview,
} = reviewSlice.actions;

const reducer = reviewSlice.reducer;

export { reducer as reviewReducer };
