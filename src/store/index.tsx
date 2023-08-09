import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";
import eventsReducer from "./slices/eventsSlice";
import filterReducer from "../store/slices/filterSlice";
import navReducer from "../store/slices/navSlice";
import themeReducer from "../store/slices/themeSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    filter: filterReducer,
    navbar: navReducer,
    theme: themeReducer
  },
});
