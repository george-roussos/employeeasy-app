import { createSlice } from "@reduxjs/toolkit";

let initialState = null;

const messageStyleSlice = createSlice({
  name: "messageStyle",
  initialState,
  reducers: {
    setType(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
    clearType(state) {
      state = "null";
      return state;
    },
  },
});

export const { setType, clearType } = messageStyleSlice.actions;

export const setStyle = (style, timeout) => {
  return (dispatch) => {
    dispatch(setType(style));
    setTimeout(() => {
      dispatch(clearType(style));
    }, timeout * 1000);
  };
};

export default messageStyleSlice.reducer;
