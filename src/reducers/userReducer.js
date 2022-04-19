import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, username: "", password: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const content = action.payload;
      state = { ...state, user: content };
      return state;
    },
    setUsername(state, action) {
      const content = action.payload;
      state = { ...state, username: content };
      return state;
    },
    setPassword(state, action) {
      const content = action.payload;
      state = { ...state, password: content };
      return state;
    },
  },
});

export const { setUser, setUsername, setPassword } = userSlice.actions;
export default userSlice.reducer;
