import { configureStore } from "@reduxjs/toolkit";
import greetingReducer from "../reducers/greetingReducer";
import bookSlice from "../reducers/bookSlice";


const store = configureStore({
  reducer: {
    greeting: greetingReducer,
    books: bookSlice,
  },
});

export default store;
