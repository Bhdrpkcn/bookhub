import { createSlice } from "@reduxjs/toolkit";

const greetingReducer = createSlice({
  name: "greeting",
  initialState: {
    userName: '',
    showGreetModal: false,
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    closeGreetModal: (state,action) => {
      state.showGreetModal = false
    },
  },
});

export const {
  setUserName,
  closeGreetModal,
} = greetingReducer.actions;

export default greetingReducer.reducer;


