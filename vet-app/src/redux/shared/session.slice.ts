// sessionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  title: string;
  message: string;
  icon: null | React.ReactNode;
  redirectTo: null | string;
  isRedirect: boolean;
}

const initialState: SessionState = {
  title: "",
  message: "",
  icon: null,
  redirectTo: null,
  isRedirect: false
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionAction: (state, action: PayloadAction<SessionState>) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.icon = action.payload.icon;
      state.redirectTo = action.payload.redirectTo;
      state.isRedirect = action.payload.isRedirect
    },
  },
});

export const { setSessionAction } = sessionSlice.actions;
const reducer = sessionSlice.reducer;
export { reducer as sessionReducer };
