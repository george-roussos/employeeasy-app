import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./reducers/employeesReducer";
import expensesReducer from "./reducers/expensesReducer";
import messageReducer from "./reducers/messageReducer";
import messageStyleReducer from "./reducers/messageStyleReducer";
import modalReducer from "./reducers/modalReducer";
import userReducer from "./reducers/userReducer";
import vacationReducer from "./reducers/vacationReducer";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    user: userReducer,
    modal: modalReducer,
    message: messageReducer,
    messageStyle: messageStyleReducer,
    vacation: vacationReducer,
    expenses: expensesReducer,
  },
});
