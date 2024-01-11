import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyBanner,
  IBanner,
  IBannerResponses,
  IBannerState,
} from "models/banner";
import { bannerService } from "services/banner.service";

export const initialState: IBannerState = {
  banners: [],
  errors: "",
  banner: emptyBanner,
  isLoading: false,
  initialFetch: true,
};

export const fetchBannersAsync = createAsyncThunk<IBannerResponses, void>(
  "banner/fetchBannersAsync",
  async (_, thunkApi) => {
    try {
      return await bannerService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    fetchbannerRequest: (state) => {
      state.isLoading = true;
    },
    fetchbannerSuccess: (state, action: PayloadAction<IBanner[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.banners = action.payload;
    },
    fetchbannerError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editBannerSuccess: (state, action: PayloadAction<IBanner>) => {
      state.banners = state.banners.map((banner) => {
        return banner.id === action.payload.id ? action.payload : banner;
      });
    },
    addBannerSuccess: (state, action: PayloadAction<IBanner>) => {
      state.banners = [...state.banners, action.payload];
    },
    setActiveBanner: (state, action: PayloadAction<IBanner>) => {
      state.banner = action.payload;
    },
    deleteBanner: (state, action: PayloadAction<IBanner>) => {
      state.banners = state.banners.filter(
        (item) => item.id !== action.payload.id
      ); // Assuming items have an 'id' property
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBannersAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchBannersAsync.fulfilled,
      (state, action: PayloadAction<IBannerResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.banners = action.payload.data;
      }
    );
    builder.addCase(fetchBannersAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchbannerRequest,
  fetchbannerSuccess,
  fetchbannerError,
  editBannerSuccess,
  addBannerSuccess,
  setActiveBanner,
  deleteBanner,
} = bannerSlice.actions;

const reducer = bannerSlice.reducer;

export { reducer as bannerReducer };
