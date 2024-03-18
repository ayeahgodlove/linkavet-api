import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSpecialtyService } from "services/user-specialty.service";
import {
  IUserSpecialtyState,
  emptyUserSpecialty,
  IUserSpecialty,
  IUserSpecialtyResponses,
} from "../models/user-specialty.model";

export const initialState: IUserSpecialtyState = {
  userSpecialties: [],
  errors: "",
  userSpecialty: emptyUserSpecialty,
  isLoading: false,
  initialFetch: true,
};

export const fetchUserSpecialtiesAsync = createAsyncThunk<IUserSpecialtyResponses, void>(
  "userSpecialty/fetchUserSpecialtiesAsync",
  async (_, thunkApi) => {
    try {
      return await UserSpecialtyService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const userSpecialtySlice = createSlice({
  name: "userSpecialty",
  initialState,
  reducers: {
    fetchUserSpecialtyRequest: (state) => {
      state.isLoading = true;
    },
    fetchUserSpecialtySuccess: (state, action: PayloadAction<IUserSpecialty[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.userSpecialties = action.payload;
    },
    fetchUserSpecialtyError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editUserSpecialtySuccess: (state, action: PayloadAction<IUserSpecialty>) => {
      state.userSpecialties = state.userSpecialties.map((userSpecialty) => {
        return userSpecialty.userId === action.payload.userId
          ? action.payload
          : userSpecialty;
      });
    },
    addUserSpecialtySuccess: (state, action: PayloadAction<IUserSpecialty>) => {
      state.userSpecialties = [...state.userSpecialties, action.payload];
    },
    setActiveUserSpecialty: (state, action: PayloadAction<IUserSpecialty>) => {
      state.userSpecialty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSpecialtiesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUserSpecialtiesAsync.fulfilled,
      (state, action: PayloadAction<IUserSpecialtyResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.userSpecialties = action.payload.data;
      }
    );
    builder.addCase(fetchUserSpecialtiesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchUserSpecialtyRequest,
  fetchUserSpecialtySuccess,
  fetchUserSpecialtyError,
  editUserSpecialtySuccess,
  addUserSpecialtySuccess,
  setActiveUserSpecialty,
} = userSpecialtySlice.actions;

const reducer = userSpecialtySlice.reducer;

export { reducer as userSpecialtyReducer };
