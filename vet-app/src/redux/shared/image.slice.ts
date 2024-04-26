import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: any = {
  images: [],
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImageSuccess: (state, action: PayloadAction<string>) => {
      state.images = [...state.images, action.payload];
    },
  },
});

export const { addImageSuccess } = imageSlice.actions;

const reducer = imageSlice.reducer;

export { reducer as imageReducer };
