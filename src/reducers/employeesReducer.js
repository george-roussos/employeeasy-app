import { createSlice } from "@reduxjs/toolkit";
import employeesService from "../services/employees";

const initialState = [];

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    appendEmployee(state, action) {
      const content = action.payload;
      state.push(content);
    },
    setEmployees(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { appendEmployee, setEmployees } = employeeSlice.actions;

export const createEmployee = (content) => {
  return async (dispatch) => {
    await employeesService.create(content);
    const employees = await employeesService.getAllEmployees();
    dispatch(setEmployees(employees));
  };
};

export const removeEmployee = (id) => {
  return async (dispatch) => {
    await employeesService.remove(id);
    const employees = await employeesService.getAllEmployees();
    dispatch(setEmployees(employees));
  };
};

export default employeeSlice.reducer;
