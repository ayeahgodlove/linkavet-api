import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyLesson,
  ILesson,
  ILessonResponses,
  ILessonState,
} from "models/lms/lesson";
import { LessonService } from "services/lms/lesson.service";

export const initialState: ILessonState = {
  lessons: [],
  errors: "",
  lesson: emptyLesson,
  isLoading: false,
  initialFetch: true,
};

export const fetchLessonsAsync = createAsyncThunk<ILessonResponses, void>(
  "lesson/fetchLessonsAsync",
  async (_, thunkApi) => {
    try {
      return await LessonService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    fetchlessonRequest: (state) => {
      state.isLoading = true;
    },
    fetchLessonSuccess: (state, action: PayloadAction<ILesson[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.lessons = action.payload;
    },
    fetchLessonError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editLessonSuccess: (state, action: PayloadAction<ILesson>) => {
      state.lessons = state.lessons.map((lesson) => {
        return lesson.id === action.payload.id ? action.payload : lesson;
      });
    },
    addLessonSuccess: (state, action: PayloadAction<ILesson>) => {
      state.lessons = [...state.lessons, action.payload];
    },
    setActiveLesson: (state, action: PayloadAction<ILesson>) => {
      state.lesson = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLessonsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchLessonsAsync.fulfilled,
      (state, action: PayloadAction<ILessonResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.lessons = action.payload.data;
      }
    );
    builder.addCase(fetchLessonsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchlessonRequest,
  fetchLessonSuccess,
  fetchLessonError,
  editLessonSuccess,
  addLessonSuccess,
  setActiveLesson,
} = lessonSlice.actions;

const reducer = lessonSlice.reducer;

export { reducer as lessonReducer };
