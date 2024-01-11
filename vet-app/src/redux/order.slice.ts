import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderService } from "services/order.service";
import { IOrderState, emptyOrder, IOrder, IOrderResponses } from "../models/order.model";

export const initialState: IOrderState = {
  orders: [],
  errors: "",
  order: emptyOrder,
  isLoading: false,
  initialFetch: true,
};

export const fetchOrdersAsync = createAsyncThunk<IOrderResponses, void>(
  "order/fetchOrdersAsync",
  async (_, thunkApi) => {
    try {
      return await OrderService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchorderRequest: (state) => {
      state.isLoading = true;
    },
    fetchorderSuccess: (state, action: PayloadAction<IOrder[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.orders = action.payload;
    },
    fetchorderError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editOrderSuccess: (state, action: PayloadAction<IOrder>) => {
      state.orders = state.orders.map((order) => {
        return order.id === action.payload.id ? action.payload : order;
      });
    },
    addOrderSuccess: (state, action: PayloadAction<IOrder>) => {
      state.orders = [...state.orders, action.payload];
    },
    setActiveOrder: (state, action: PayloadAction<IOrder>) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.orders = action.payload.data;
    });
    builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchorderRequest,
  fetchorderSuccess,
  fetchorderError,
  editOrderSuccess,
  addOrderSuccess,
  setActiveOrder,
} = orderSlice.actions;

const reducer = orderSlice.reducer;

export { reducer as orderReducer };
