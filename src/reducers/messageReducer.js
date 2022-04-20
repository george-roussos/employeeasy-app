import { createSlice } from "@reduxjs/toolkit";

let initialState = null;

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setType(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
    setMessage(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
    createEmployee(state, action) {
      const content = action.payload;
      state = `Added employee: ${content}`;
      return state;
    },
    editEmployee(state, action) {
      const content = action.payload;
      state = `Edited employee: ${content}`;
      return state;
    },
    clearMessage(state) {
      state = null;
      return state;
    },
  },
});

export const { createMessage, voteMessage, clearMessage, setMessage, setType } =
  messageSlice.actions;

export const setNotification = (text, timeout) => {
  return (dispatch) => {
    dispatch(setMessage(text));
    setTimeout(() => {
      dispatch(clearMessage(text));
    }, timeout * 1000);
  };
};

export default messageSlice.reducer;
