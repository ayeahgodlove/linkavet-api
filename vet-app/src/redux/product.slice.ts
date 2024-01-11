import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductService } from "services/product.service";
import {
  IProductState,
  emptyProduct,
  IProduct,
  IProductResponses,
  ProductFormData,
} from "../models/product.model";

export const initialState: IProductState = {
  products: [],
  errors: "",
  product: emptyProduct,
  isLoading: false,
  initialFetch: true,
};

export const fetchProductsAsync = createAsyncThunk<IProductResponses, void>(
  "product/fetchProductsAsync",
  async (_, thunkApi) => {
    try {
      return await ProductService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchproductRequest: (state) => {
      state.isLoading = true;
    },
    fetchproductSuccess: (state, action: PayloadAction<IProduct[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.products = action.payload;
    },
    fetchproductError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editProductSuccess: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.map((product) => {
        return product.id === action.payload.id ? action.payload : product;
      });
    },
    // uploadProductImage: (state, action: PayloadAction<IProduct>) => {
    //   state.products = state.products.map((product) => {
    //     return product.id === action.payload.id
    //       ? { ...action.payload, productImages: action.payload.productImages }
    //       : { ...product, productImages: product.productImages };
    //   });
    // },
    addProductSuccess: (state, action: PayloadAction<IProduct>) => {
      state.products = [...state.products, action.payload];
    },
    setActiveProduct: (state, action: PayloadAction<IProduct>) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.products = action.payload.data;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchproductRequest,
  fetchproductSuccess,
  fetchproductError,
  editProductSuccess,
  addProductSuccess,
  setActiveProduct,
  // uploadProductImage,
} = productSlice.actions;

const reducer = productSlice.reducer;

export { reducer as productReducer };
