import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyConsultation,
  IConsultation,
  IConsultationResponses,
  IConsultationState,
} from "models/health/consultation";
import { ConsultationService } from "services/health/consultation.service";

export const initialState: IConsultationState = {
  consultations: [],
  errors: "",
  consultation: emptyConsultation,
  isLoading: false,
  initialFetch: true,
};

export const fetchConsultationsAsync = createAsyncThunk<IConsultationResponses, void>(
  "consultation/fetchConsultationsAsync",
  async (_, thunkApi) => {
    try {
      return await ConsultationService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    fetchConsultationRequest: (state) => {
      state.isLoading = true;
    },
    fetchConsultationSuccess: (state, action: PayloadAction<IConsultation[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.consultations = action.payload;
    },
    fetchConsultationError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editConsultationSuccess: (state, action: PayloadAction<IConsultation>) => {
      state.consultations = state.consultations.map((consultation) => {
        return consultation.id === action.payload.id ? action.payload : consultation;
      });
    },
    addConsultationSuccess: (state, action: PayloadAction<IConsultation>) => {
      state.consultations = [...state.consultations, action.payload];
    },
    setActiveConsultation: (state, action: PayloadAction<IConsultation>) => {
      state.consultation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConsultationsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchConsultationsAsync.fulfilled,
      (state, action: PayloadAction<IConsultationResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.consultations = action.payload.data;
      }
    );
    builder.addCase(fetchConsultationsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchConsultationRequest,
  fetchConsultationSuccess,
  fetchConsultationError,
  editConsultationSuccess,
  addConsultationSuccess,
  setActiveConsultation,
} = consultationSlice.actions;

const reducer = consultationSlice.reducer;

export { reducer as consultationReducer };
