import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagService } from "services/tag.service";
import { ITagState, emptyTag, ITag, ITagResponse, ITagResponses } from "../models/tag.model";

export const initialState: ITagState = {
  tags: [],
  errors: "",
  tag: emptyTag,
  isLoading: false,
  initialFetch: true,
};

export const fetchTagsAsync = createAsyncThunk<ITagResponses, void>(
  "tag/fetchTagsAsync",
  async (_, thunkApi) => {
    try {
      return await TagService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    fetchtagRequest: (state) => {
      state.isLoading = true;
    },
    fetchtagSuccess: (state, action: PayloadAction<ITag[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.tags = action.payload;
    },
    fetchtagError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editTagSuccess: (state, action: PayloadAction<ITag>) => {
      state.tags = state.tags.map((tag) => {
        return tag.id === action.payload.id ? action.payload : tag;
      });
    },
    addTagSuccess: (state, action: PayloadAction<ITag>) => {
      state.tags = [...state.tags, action.payload];
    },
    setActiveTag: (state, action: PayloadAction<ITag>) => {
      state.tag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTagsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTagsAsync.fulfilled, (state, action: PayloadAction<ITagResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.tags = action.payload.data;
    });
    builder.addCase(fetchTagsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchtagRequest,
  fetchtagSuccess,
  fetchtagError,
  editTagSuccess,
  addTagSuccess,
  setActiveTag,
} = tagSlice.actions;

const reducer = tagSlice.reducer;

export { reducer as tagReducer };
