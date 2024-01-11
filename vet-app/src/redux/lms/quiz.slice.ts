import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyQuiz,
  IQuiz,
  IQuizResponses,
  IQuizState,
} from "models/lms/quiz";
import { QuizService } from "services/lms/quiz.service";

export const initialState: IQuizState = {
  quizs: [],
  errors: "",
  quiz: emptyQuiz,
  isLoading: false,
  initialFetch: true,
};

export const fetchQuizsAsync = createAsyncThunk<IQuizResponses, void>(
  "quiz/fetchQuizsAsync",
  async (_, thunkApi) => {
    try {
      return await QuizService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    fetchquizRequest: (state) => {
      state.isLoading = true;
    },
    fetchquizSuccess: (state, action: PayloadAction<IQuiz[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.quizs = action.payload;
    },
    fetchquizError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editQuizSuccess: (state, action: PayloadAction<IQuiz>) => {
      state.quizs = state.quizs.map((quiz) => {
        return quiz.id === action.payload.id ? action.payload : quiz;
      });
    },
    addQuizSuccess: (state, action: PayloadAction<IQuiz>) => {
      state.quizs = [...state.quizs, action.payload];
    },
    setActiveQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.quiz = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuizsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchQuizsAsync.fulfilled,
      (state, action: PayloadAction<IQuizResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.quizs = action.payload.data;
      }
    );
    builder.addCase(fetchQuizsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchquizRequest,
  fetchquizSuccess,
  fetchquizError,
  editQuizSuccess,
  addQuizSuccess,
  setActiveQuiz,
} = quizSlice.actions;

const reducer = quizSlice.reducer;

export { reducer as quizReducer };
