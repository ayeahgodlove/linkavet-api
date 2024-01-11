import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyEnrollment,
  IEnrollment,
  IEnrollmentResponses,
  IEnrollmentState,
} from "models/lms/enrollment";
import { EnrollmentService } from "services/lms/enrollment.service";

export const initialState: IEnrollmentState = {
  enrollments: [],
  errors: "",
  enrollment: emptyEnrollment,
  isLoading: false,
  initialFetch: true,
};

export const fetchEnrollmentsAsync = createAsyncThunk<IEnrollmentResponses, void>(
  "enrollment/fetchEnrollmentsAsync",
  async (_, thunkApi) => {
    try {
      return await EnrollmentService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    fetchenrollmentRequest: (state) => {
      state.isLoading = true;
    },
    fetchenrollmentSuccess: (state, action: PayloadAction<IEnrollment[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.enrollments = action.payload;
    },
    fetchenrollmentError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editEnrollmentSuccess: (state, action: PayloadAction<IEnrollment>) => {
      state.enrollments = state.enrollments.map((enrollment) => {
        return enrollment.id === action.payload.id ? action.payload : enrollment;
      });
    },
    addEnrollmentSuccess: (state, action: PayloadAction<IEnrollment>) => {
      state.enrollments = [...state.enrollments, action.payload];
    },
    setActiveEnrollment: (state, action: PayloadAction<IEnrollment>) => {
      state.enrollment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEnrollmentsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchEnrollmentsAsync.fulfilled,
      (state, action: PayloadAction<IEnrollmentResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.enrollments = action.payload.data;
      }
    );
    builder.addCase(fetchEnrollmentsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchenrollmentRequest,
  fetchenrollmentSuccess,
  fetchenrollmentError,
  editEnrollmentSuccess,
  addEnrollmentSuccess,
  setActiveEnrollment,
} = enrollmentSlice.actions;

const reducer = enrollmentSlice.reducer;

export { reducer as enrollmentReducer };
