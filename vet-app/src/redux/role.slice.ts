import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleService } from "services/role.service";
import { IRoleState, emptyRole, IRole, IRoleResponse, IRoleResponses } from "../models/role.model";

export const initialState: IRoleState = {
  roles: [],
  errors: "",
  role: emptyRole,
  isLoading: false,
  initialFetch: true,
};

export const fetchRolesAsync = createAsyncThunk<IRoleResponses, void>(
  "role/fetchRolesAsync",
  async (_, thunkApi) => {
    try {
      return await RoleService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    fetchRoleRequest: (state) => {
      state.isLoading = true;
    },
    fetchRoleSuccess: (state, action: PayloadAction<IRole[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.roles = action.payload;
    },
    fetchRoleError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editRoleSuccess: (state, action: PayloadAction<IRole>) => {
      state.roles = state.roles.map((role) => {
        return role.id === action.payload.id ? action.payload : role;
      });
    },
    addRoleSuccess: (state, action: PayloadAction<IRole>) => {
      state.roles = [...state.roles, action.payload];
    },
    setActiveRole: (state, action: PayloadAction<IRole>) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRolesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRolesAsync.fulfilled, (state, action: PayloadAction<IRoleResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.roles = action.payload.data;
    });
    builder.addCase(fetchRolesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchRoleRequest,
  fetchRoleSuccess,
  fetchRoleError,
  editRoleSuccess,
  addRoleSuccess,
  setActiveRole,
} = roleSlice.actions;

const reducer = roleSlice.reducer;

export { reducer as roleReducer };
