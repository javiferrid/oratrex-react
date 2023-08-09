import { createSlice } from "@reduxjs/toolkit";
import { Option } from "../../types/ticket";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    value: Option.COLLECTIBLES
  },
  reducers: {
    updateFilter: (state) => {
      if (state.value === Option.COLLECTIBLES) state.value = Option.UPCOMING
      else if (state.value === Option.UPCOMING) state.value = Option.COLLECTIBLES
    }
  }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer
