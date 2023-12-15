import { createSlice } from "@reduxjs/toolkit";

const greetingReducer = createSlice({
  name: "greeting",
  initialState: {
    userName: JSON.parse(localStorage.getItem("userNameInput")) || "",
    showGreetModal: false,
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userNameInput", JSON.stringify(state.userName));
    },
    closeGreetModal: (state, action) => {
      state.showGreetModal = false;
    },
  },
});

export const { setUserName, closeGreetModal } = greetingReducer.actions;

export default greetingReducer.reducer;
