import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyStore, IStore, IStoreResponses, IStoreState } from "models/store";
import { storeService } from "services/store.service";

export const initialState: IStoreState = {
  stores: [],
  errors: "",
  store: emptyStore,
  isLoading: false,
  initialFetch: true,
};

export const fetchStoresAsync = createAsyncThunk<IStoreResponses, void>(
  "store/fetchStoresAsync",
  async (_, thunkApi) => {
    try {
      return await storeService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    fetchstoreRequest: (state) => {
      state.isLoading = true;
    },
    fetchstoreSuccess: (state, action: PayloadAction<IStore[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.stores = action.payload;
    },
    fetchstoreError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editStoreSuccess: (state, action: PayloadAction<IStore>) => {
      state.stores = state.stores.map((store) => {
        return store.id === action.payload.id ? action.payload : store;
      });
    },
    addStoreSuccess: (state, action: PayloadAction<IStore>) => {
      state.stores = [...state.stores, action.payload];
    },
    setActiveStore: (state, action: PayloadAction<IStore>) => {
      state.store = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStoresAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStoresAsync.fulfilled, (state, action: PayloadAction<IStoreResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.stores = action.payload.data;
    });
    builder.addCase(fetchStoresAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchstoreRequest,
  fetchstoreSuccess,
  fetchstoreError,
  editStoreSuccess,
  addStoreSuccess,
  setActiveStore,
} = storeSlice.actions;

const reducer = storeSlice.reducer;

export { reducer as storeReducer };
