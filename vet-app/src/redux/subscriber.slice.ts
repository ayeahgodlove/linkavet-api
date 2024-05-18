import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubscriberService } from "../services/subscriber.service";
import { ISubscriberState, emptySubscriber, ISubscriber, ISubscriberResponse, ISubscriberResponses } from "../models/subscriber.model";

export const initialState: ISubscriberState = {
  subscribers: [],
  errors: "",
  subscriber: emptySubscriber,
  isLoading: false,
  initialFetch: true,
};

export const fetchSubscribersAsync = createAsyncThunk<ISubscriberResponses, void>(
  "subscriber/fetchSubscribersAsync",
  async (_, thunkApi) => {
    try {
      return await SubscriberService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const subscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers: {
    fetchSubscriberRequest: (state) => {
      state.isLoading = true;
    },
    fetchSubscriberSuccess: (state, action: PayloadAction<ISubscriber[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.subscribers = action.payload;
    },
    fetchSubscriberError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editSubscriberSuccess: (state, action: PayloadAction<ISubscriber>) => {
      state.subscribers = state.subscribers.map((subscriber) => {
        return subscriber.id === action.payload.id ? action.payload : subscriber;
      });
    },
    addSubscriberSuccess: (state, action: PayloadAction<ISubscriber>) => {
      state.subscribers = [...state.subscribers, action.payload];
    },
    setActiveSubscriber: (state, action: PayloadAction<ISubscriber>) => {
      state.subscriber = action.payload;
    },
    deleteSubscriber: (state, action: PayloadAction<ISubscriber>) => {
      state.subscribers = state.subscribers.filter(
        (item) => item.id !== action.payload.id
      ); // Assuming items have an 'id' property
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubscribersAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSubscribersAsync.fulfilled, (state, action: PayloadAction<ISubscriberResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.subscribers = action.payload.data;
    });
    builder.addCase(fetchSubscribersAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchSubscriberRequest,
  fetchSubscriberSuccess,
  fetchSubscriberError,
  editSubscriberSuccess,
  addSubscriberSuccess,
  setActiveSubscriber,
  deleteSubscriber
} = subscriberSlice.actions;

const reducer = subscriberSlice.reducer;

export { reducer as subscriberReducer };
