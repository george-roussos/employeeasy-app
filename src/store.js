import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./reducers/employeesReducer";
import userReducer from "./reducers/userReducer";
import vacationReducer from "./reducers/vacationReducer";
import expensesReducer from "./reducers/expensesReducer";
import modalReducer from "./reducers/modalReducer";
import messageReducer from "./reducers/messageReducer";
import messageStyleReducer from "./reducers/messageStyleReducer";

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
