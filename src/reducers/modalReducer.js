import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setEditMode(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
  },
});

export const { setEditMode } = modalSlice.actions;
export default modalSlice.reducer;
