import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [] as any,
  loadingEvents: true as boolean,
};

export const ticketsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state: any, action: any) => {
      state.value = [...action.payload] as any;
    },
    setLoadingEvents: (state, action: any) => {
      state.loadingEvents = action.payload;
    },
    addTicketData: (state, action: any) => {
      state.value = [...state.value, action.payload];
    },
    resetEvents: (state: any) => (state = initialState),
  },
});

export default ticketsSlice.reducer;

export const { setLoadingEvents, addTicketData, setEvents, resetEvents } =
  ticketsSlice.actions;
