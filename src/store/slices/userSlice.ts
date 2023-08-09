import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: any) => {
      state.value = { ...action.payload };
    },
    logout: (state) => {
      localStorage.removeItem("auth_token");
      return (state = initialState);
    },
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
