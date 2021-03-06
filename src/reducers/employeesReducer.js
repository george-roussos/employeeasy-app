import { createSlice } from "@reduxjs/toolkit";
import employeesService from "../services/employees";

const initialState = [];

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
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

export const editEmployee = (content, id) => {
  return async (dispatch) => {
    await employeesService.editEmployee(content, id);
    const employees = await employeesService.getAllEmployees();
    dispatch(setEmployees(employees));
  };
};

export default employeeSlice.reducer;
