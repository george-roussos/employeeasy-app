import { createSlice } from "@reduxjs/toolkit";
import vacationService from "../services/vacation";

const initialState = [];

const vacationSlice = createSlice({
  name: "vacation",
  initialState,
  reducers: {
    setVacation(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { setVacation } = vacationSlice.actions;

export const createVacation = (content) => {
  return async (dispatch) => {
    await vacationService.create(content);
    const vacation = await vacationService.getAllVacation();
    dispatch(setVacation(vacation));
  };
};

export const editVacation = (content, id) => {
  return async (dispatch) => {
    await vacationService.editVacation(content, id);
    const vacation = await vacationService.getAllVacation();
    dispatch(setVacation(vacation));
  };
};

export default vacationSlice.reducer;
