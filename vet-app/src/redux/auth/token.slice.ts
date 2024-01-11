// tokenSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  token: null | string;
}

const initialState: TokenState = {
  token: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenAction: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setTokenAction } = tokenSlice.actions;
const reducer  = tokenSlice.reducer;
export { reducer as tokenReducer};
