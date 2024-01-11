import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentService } from "services/payment.service";
import { IPaymentState, emptyPayment, IPayment, IPaymentResponses } from "../models/payment.model";

export const initialState: IPaymentState = {
  payments: [],
  errors: "",
  payment: emptyPayment,
  isLoading: false,
  initialFetch: true,
};

export const fetchPaymentsAsync = createAsyncThunk<IPaymentResponses, void>(
  "payment/fetchPaymentsAsync",
  async (_, thunkApi) => {
    try {
      return await PaymentService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    fetchpaymentRequest: (state) => {
      state.isLoading = true;
    },
    fetchpaymentSuccess: (state, action: PayloadAction<IPayment[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.payments = action.payload;
    },
    fetchpaymentError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editPaymentSuccess: (state, action: PayloadAction<IPayment>) => {
      state.payments = state.payments.map((payment) => {
        return payment.id === action.payload.id ? action.payload : payment;
      });
    },
    addPaymentSuccess: (state, action: PayloadAction<IPayment>) => {
      state.payments = [...state.payments, action.payload];
    },
    setActivePayment: (state, action: PayloadAction<IPayment>) => {
      state.payment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPaymentsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPaymentsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.payments = action.payload.data;
    });
    builder.addCase(fetchPaymentsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchpaymentRequest,
  fetchpaymentSuccess,
  fetchpaymentError,
  editPaymentSuccess,
  addPaymentSuccess,
  setActivePayment,
} = paymentSlice.actions;

const reducer = paymentSlice.reducer;

export { reducer as paymentReducer };
