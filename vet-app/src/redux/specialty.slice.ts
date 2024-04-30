import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpecialtyService } from "../services/specialty.service";
import {
  ISpecialtyState,
  emptySpecialty,
  ISpecialty,
  ISpecialtyResponses,
} from "../models/specialty.model";

export const initialState: ISpecialtyState = {
  specialties: [],
  errors: "",
  specialty: emptySpecialty,
  isLoading: false,
  initialFetch: true,
};

export const fetchSpecialtiesAsync = createAsyncThunk<ISpecialtyResponses, void>(
  "specialty/fetchSpecialtiesAsync",
  async (_, thunkApi) => {
    try {
      return await SpecialtyService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const specialtySlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {
    fetchSpecialtyRequest: (state) => {
      state.isLoading = true;
    },
    fetchSpecialtySuccess: (state, action: PayloadAction<ISpecialty[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.specialties = action.payload;
    },
    fetchSpecialtyError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editSpecialtySuccess: (state, action: PayloadAction<ISpecialty>) => {
      state.specialties = state.specialties.map((specialty) => {
        return specialty.userId === action.payload.userId
          ? action.payload
          : specialty;
      });
    },
    addSpecialtySuccess: (state, action: PayloadAction<ISpecialty>) => {
      state.specialties = [...state.specialties, action.payload];
    },
    setActiveSpecialty: (state, action: PayloadAction<ISpecialty>) => {
      state.specialty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpecialtiesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchSpecialtiesAsync.fulfilled,
      (state, action: PayloadAction<ISpecialtyResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.specialties = action.payload.data;
      }
    );
    builder.addCase(fetchSpecialtiesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchSpecialtyRequest,
  fetchSpecialtySuccess,
  fetchSpecialtyError,
  editSpecialtySuccess,
  addSpecialtySuccess,
  setActiveSpecialty,
} = specialtySlice.actions;

const reducer = specialtySlice.reducer;

export { reducer as specialtyReducer };
