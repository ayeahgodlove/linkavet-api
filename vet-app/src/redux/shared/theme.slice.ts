import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const initialState = {
  isDarkMode: !!JSON.parse(localStorage.getItem("darkmode")!!),
};

export const themeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {

    setActiveTheme: (state, action: PayloadAction<boolean>) => {
        localStorage.setItem("darkmode", JSON.stringify(action.payload));
      state.isDarkMode = action.payload;
    },
  },
 
});

export const {
  setActiveTheme,
} = themeSlice.actions;

const reducer = themeSlice.reducer;

export { reducer as themeReducer };
