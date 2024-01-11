import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyComment, IComment, ICommentState } from "models/comment";

export const initialState: ICommentState = {
  comments: [],
  errors: "",
  comment: emptyComment,
  isLoading: false,
  initialFetch: true,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchcommentRequest: (state) => {
      state.isLoading = true;
    },
    fetchcommentSuccess: (state, action: PayloadAction<IComment[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.comments = action.payload;
    },
    fetchcommentError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editCommentSuccess: (state, action: PayloadAction<IComment>) => {
      state.comments = state.comments.map((comment) => {
        return comment.id === action.payload.id ? action.payload : comment;
      });
    },
    addCommentSuccess: (state, action: PayloadAction<IComment>) => {
      state.comments = [...state.comments, action.payload];
    },
    setActiveComment: (state, action: PayloadAction<IComment>) => {
      state.comment = action.payload;
    },
  },
});

export const {
  fetchcommentRequest,
  fetchcommentSuccess,
  fetchcommentError,
  editCommentSuccess,
  addCommentSuccess,
  setActiveComment,
} = commentSlice.actions;

const reducer = commentSlice.reducer;

export { reducer as commentReducer };
