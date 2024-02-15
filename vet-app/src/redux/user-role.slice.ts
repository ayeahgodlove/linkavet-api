import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRoleService } from "services/user-role.service";
import {
  IUserRoleState,
  emptyUserRole,
  IUserRole,
  IUserRoleResponses,
} from "../models/user-role.model";

export const initialState: IUserRoleState = {
  userRoles: [],
  errors: "",
  userRole: emptyUserRole,
  isLoading: false,
  initialFetch: true,
};

export const fetchUserRolesAsync = createAsyncThunk<IUserRoleResponses, void>(
  "userRole/fetchUserRolesAsync",
  async (_, thunkApi) => {
    try {
      return await UserRoleService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    fetchUserRoleRequest: (state) => {
      state.isLoading = true;
    },
    fetchUserRoleSuccess: (state, action: PayloadAction<IUserRole[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.userRoles = action.payload;
    },
    fetchUserRoleError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editUserRoleSuccess: (state, action: PayloadAction<IUserRole>) => {
      state.userRoles = state.userRoles.map((userRole) => {
        return userRole.userId === action.payload.userId
          ? action.payload
          : userRole;
      });
    },
    addUserRoleSuccess: (state, action: PayloadAction<IUserRole>) => {
      state.userRoles = [...state.userRoles, action.payload];
    },
    setActiveUserRole: (state, action: PayloadAction<IUserRole>) => {
      state.userRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserRolesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUserRolesAsync.fulfilled,
      (state, action: PayloadAction<IUserRoleResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.userRoles = action.payload.data;
      }
    );
    builder.addCase(fetchUserRolesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchUserRoleRequest,
  fetchUserRoleSuccess,
  fetchUserRoleError,
  editUserRoleSuccess,
  addUserRoleSuccess,
  setActiveUserRole,
} = userRoleSlice.actions;

const reducer = userRoleSlice.reducer;

export { reducer as userRoleReducer };
