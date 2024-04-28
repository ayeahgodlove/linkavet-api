import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser, emptyUser } from "../../models/user.model";
import { authService } from "../../services/auth.service";

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: IUser, thunkAPI) => {
    try {
      const response = await authService.register(user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await authService.login(user);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//logout user
export const logoutFun = createAsyncThunk("/auth/logout", async () => {
  try {
    await authService.logout();
    return true;
  } catch (error: any) {
    return false;
  }
});

interface AuthState {
  user: IUser;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string;
}

const initialState: AuthState = {
  user: JSON.parse(window.localStorage.getItem("user") || "null"),
  isLoading: false,
  error: null,
  isAuthenticated: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login section
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload.token as string;
      console.log("nted: ", action.payload)
      window.localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // register section
    registerRequest: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    registerError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // logout
    logoutUser: (state) => {
      state.user = emptyUser;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
      window.localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.token = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = "";
      });
  },
});

export const {
  logoutUser,
  loginError,
  loginRequest,
  loginSuccess,
  registerError,
  registerRequest,
  registerSuccess,
} = authSlice.actions;
const reducer = authSlice.reducer;

export { reducer as authReducer };
