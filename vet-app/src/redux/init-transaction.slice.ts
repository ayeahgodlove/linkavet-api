import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyInitPayment,
  emptyInitTransaction,
  IInitPayment,
  IInitTransaction,
  IInitTransactionState,
} from "models/init-payment.model";

export const initialState: IInitTransactionState = {
  errors: "",
  initTransaction: emptyInitTransaction,
  initPayment: emptyInitPayment,
  isLoading: false,
  initialFetch: true,
};

export const initTransactionSlice = createSlice({
  name: "initTransaction",
  initialState,
  reducers: {
    setActiveInitTransaction: (
      state,
      action: PayloadAction<IInitTransaction>
    ) => {
      state.initTransaction = action.payload;
    },
    setInitPayment: (state, action: PayloadAction<IInitPayment>) => {
      state.initPayment = action.payload
    }
  },
});

export const { setActiveInitTransaction, setInitPayment } = initTransactionSlice.actions;

const reducer = initTransactionSlice.reducer;

export { reducer as initTransactionReducer };
