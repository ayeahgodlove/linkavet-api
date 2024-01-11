import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyPost, IPost, IPostResponses, IPostState } from "models/post";
import { PostService } from "services/post.service";

export const initialState: IPostState = {
  posts: [],
  errors: "",
  post: emptyPost,
  isLoading: false,
  initialFetch: true,
};

export const fetchPostsAsync = createAsyncThunk<IPostResponses, void>(
  "post/fetchPostsAsync",
  async (_, thunkApi) => {
    try {
       const response = await PostService.list();
       return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchpostRequest: (state) => {
      state.isLoading = true;
    },
    fetchpostSuccess: (state, action: PayloadAction<IPost[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.posts = action.payload;
    },
    fetchpostError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editPostSuccess: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.map((post) => {
        return post.id === action.payload.id ? action.payload : post;
      });
    },
    addPostSuccess: (state, action: PayloadAction<IPost>) => {
      state.posts = [...state.posts, action.payload];
    },
    setActivePost: (state, action: PayloadAction<IPost>) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostsAsync.fulfilled, (state, action: PayloadAction<IPostResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.posts = action.payload.data;
    });
    builder.addCase(fetchPostsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchpostRequest,
  fetchpostSuccess,
  fetchpostError,
  editPostSuccess,
  addPostSuccess,
  setActivePost,
} = postSlice.actions;

const reducer = postSlice.reducer;

export { reducer as postReducer };
