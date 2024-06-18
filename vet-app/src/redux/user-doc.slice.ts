import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDocService } from "../services/user-doc.service";
import {
  IUserDocState,
  emptyUserDoc,
  IUserDoc,
  IUserDocResponses,
} from "../models/user-doc.model";

export const initialState: IUserDocState = {
  userDocs: [],
  errors: "",
  userDoc: emptyUserDoc,
  isLoading: false,
  initialFetch: true,
};

export const fetchUserDocsAsync = createAsyncThunk<IUserDocResponses, void>(
  "userDoc/fetchUserDocsAsync",
  async (_, thunkApi) => {
    try {
      return await UserDocService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const userDocSlice = createSlice({
  name: "userDoc",
  initialState,
  reducers: {
    fetchUserDocRequest: (state) => {
      state.isLoading = true;
    },
    fetchUserDocSuccess: (state, action: PayloadAction<IUserDoc[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.userDocs = action.payload;
    },
    fetchUserDocError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editUserDocSuccess: (state, action: PayloadAction<IUserDoc>) => {
      state.userDocs = state.userDocs.map((userDoc) => {
        return userDoc.userId === action.payload.userId
          ? action.payload
          : userDoc;
      });
    },
    addUserDocSuccess: (state, action: PayloadAction<IUserDoc>) => {
      state.userDocs = [...state.userDocs, action.payload];
    },
    setActiveUserDoc: (state, action: PayloadAction<IUserDoc>) => {
      state.userDoc = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDocsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUserDocsAsync.fulfilled,
      (state, action: PayloadAction<IUserDocResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.userDocs = action.payload.data;
      }
    );
    builder.addCase(fetchUserDocsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchUserDocRequest,
  fetchUserDocSuccess,
  fetchUserDocError,
  editUserDocSuccess,
  addUserDocSuccess,
  setActiveUserDoc,
} = userDocSlice.actions;

const reducer = userDocSlice.reducer;

export { reducer as userDocReducer };
