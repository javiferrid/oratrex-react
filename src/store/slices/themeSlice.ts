import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    theme: "dark",
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state: any, action: any) => {
      state.value.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
