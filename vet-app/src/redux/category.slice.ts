import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryService } from "../services/category.service";
import { ICategoryState, emptyCategory, ICategory, ICategoryResponses } from "../models/category.model";

export const initialState: ICategoryState = {
  categories: [],
  errors: "",
  category: emptyCategory,
  isLoading: false,
  initialFetch: true,
};

export const fetchCategoriesAsync = createAsyncThunk<ICategoryResponses, void>(
  "category/fetchCategoriesAsync",
  async (_, thunkApi) => {
    try {
      return await CategoryService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchcategoryRequest: (state) => {
      state.isLoading = true;
    },
    fetchcategorySuccess: (state, action: PayloadAction<ICategory[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.categories = action.payload;
    },
    fetchcategoryError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editCategorySuccess: (state, action: PayloadAction<ICategory>) => {
      state.categories = state.categories.map((category) => {
        return category.id === action.payload.id ? action.payload : category;
      });
    },
    addCategorySuccess: (state, action: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, action.payload];
    },
    setActiveCategory: (state, action: PayloadAction<ICategory>) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<ICategoryResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.categories = action.payload.data;
    });
    builder.addCase(fetchCategoriesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchcategoryRequest,
  fetchcategorySuccess,
  fetchcategoryError,
  editCategorySuccess,
  addCategorySuccess,
  setActiveCategory,
} = categorySlice.actions;

const reducer = categorySlice.reducer;

export { reducer as categoryReducer };
