import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyCourse,
  ICourse,
  ICourseResponses,
  ICourseState,
} from "models/lms/course";
import { CourseService } from "services/lms/course.service";

export const initialState: ICourseState = {
  courses: [],
  errors: "",
  course: emptyCourse,
  isLoading: false,
  initialFetch: true,
};

export const fetchCoursesAsync = createAsyncThunk<ICourseResponses, void>(
  "course/fetchCoursesAsync",
  async (_, thunkApi) => {
    try {
      return await CourseService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    fetchCourseRequest: (state) => {
      state.isLoading = true;
    },
    fetchCourseSuccess: (state, action: PayloadAction<ICourse[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.courses = action.payload;
    },
    fetchCourseError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editCourseSuccess: (state, action: PayloadAction<ICourse>) => {
      state.courses = state.courses.map((course) => {
        return course.id === action.payload.id ? action.payload : course;
      });
    },
    addCourseSuccess: (state, action: PayloadAction<ICourse>) => {
      state.courses = [...state.courses, action.payload];
    },
    setActiveCourse: (state, action: PayloadAction<ICourse>) => {
      state.course = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoursesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCoursesAsync.fulfilled,
      (state, action: PayloadAction<ICourseResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.courses = action.payload.data;
      }
    );
    builder.addCase(fetchCoursesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchCourseRequest,
  fetchCourseSuccess,
  fetchCourseError,
  editCourseSuccess,
  addCourseSuccess,
  setActiveCourse,
} = courseSlice.actions;

const reducer = courseSlice.reducer;

export { reducer as courseReducer };
