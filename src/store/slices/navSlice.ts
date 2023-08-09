import { createSlice } from "@reduxjs/toolkit";
import { NavElementType } from "../../types/nav";

export const navSlice = createSlice({
  name: 'navbar',
  initialState: {
    activeTab: NavElementType.MY_EVENTS
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    }
  }
})

export const { setActiveTab } = navSlice.actions
export default navSlice.reducer