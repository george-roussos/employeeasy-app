import { createSlice } from "@reduxjs/toolkit";
import vacationService from "../services/vacation";

const initialState = [];

const vacationSlice = createSlice({
  name: "vacation",
  initialState,
  reducers: {
    appendVacation(state, action) {
      const content = action.payload;
      state.push(content);
    },
    setVacation(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { appendVacation, setVacation } = vacationSlice.actions;

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

export const removeVacation = (id) => {
  return async (dispatch) => {
    await vacationService.remove(id);
    const vacation = await vacationService.getAllVacation();
    dispatch(setVacation(vacation));
  };
};

export default vacationSlice.reducer;
