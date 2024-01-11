import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyAppointment,
  IAppointment,
  IAppointmentResponses,
  IAppointmentState,
} from "models/health/appointment";
import { AppointmentService } from "services/health/appointment.service";

export const initialState: IAppointmentState = {
  appointments: [],
  errors: "",
  appointment: emptyAppointment,
  isLoading: false,
  initialFetch: true,
};

export const fetchAppointmentsAsync = createAsyncThunk<IAppointmentResponses, void>(
  "appointment/fetchAppointmentsAsync",
  async (_, thunkApi) => {
    try {
      return await AppointmentService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    fetchAppointmentRequest: (state) => {
      state.isLoading = true;
    },
    fetchAppointmentSuccess: (state, action: PayloadAction<IAppointment[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.appointments = action.payload;
    },
    fetchAppointmentError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editAppointmentSuccess: (state, action: PayloadAction<IAppointment>) => {
      state.appointments = state.appointments.map((appointment) => {
        return appointment.id === action.payload.id ? action.payload : appointment;
      });
    },
    addAppointmentSuccess: (state, action: PayloadAction<IAppointment>) => {
      state.appointments = [...state.appointments, action.payload];
    },
    setActiveAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.appointment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppointmentsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAppointmentsAsync.fulfilled,
      (state, action: PayloadAction<IAppointmentResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.appointments = action.payload.data;
      }
    );
    builder.addCase(fetchAppointmentsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchAppointmentRequest,
  fetchAppointmentSuccess,
  fetchAppointmentError,
  editAppointmentSuccess,
  addAppointmentSuccess,
  setActiveAppointment,
} = appointmentSlice.actions;

const reducer = appointmentSlice.reducer;

export { reducer as appointmentReducer };
