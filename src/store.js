import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./reducers/employeesReducer";
import userReducer from "./reducers/userReducer";
import vacationReducer from "./reducers/vacationReducer";
import expensesReducer from "./reducers/expensesReducer";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    user: userReducer,
    vacation: vacationReducer,
    expenses: expensesReducer,
  },
});
