import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserService } from "services/user.service";
import { IUserState, emptyUser, IUser, IUserResponse, IUserResponses } from "../models/user.model";

export const initialState: IUserState = {
  users: [],
  errors: "",
  user: emptyUser,
  isLoading: false,
  initialFetch: true,
};

export const fetchUsersAsync = createAsyncThunk<IUserResponses, void>(
  "user/fetchUsusersAsync",
  async (_, thunkApi) => {
    try {
      return await UserService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.isLoading = true;
    },
    fetchUserSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.users = action.payload;
    },
    fetchUserError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.map((user) => {
        return user.id === action.payload.id ? action.payload : user;
      });
    },
    addUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.users = [...state.users, action.payload];
    },
    setActiveUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsersAsync.fulfilled, (state, action: PayloadAction<IUserResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.users = action.payload.data;
    });
    builder.addCase(fetchUsersAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
  editUserSuccess,
  addUserSuccess,
  setActiveUser,
} = userSlice.actions;

const reducer = userSlice.reducer;

export { reducer as userReducer };
