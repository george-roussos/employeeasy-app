import { createSlice } from "@reduxjs/toolkit";
import expensesService from "../services/expenses";

const initialState = [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses(state, action) {
      const content = action.payload;
      return content;
    },
  },
});

export const { appendExpense, setExpenses } = expenseSlice.actions;

export const createExpense = (content) => {
  return async (dispatch) => {
    await expensesService.create(content);
    const expenses = await expensesService.getAllExpenses();
    dispatch(setExpenses(expenses));
  };
};

export const editExpense = (content, id) => {
  return async (dispatch) => {
    await expensesService.editExpense(content, id);
    const expenses = await expensesService.getAllExpenses();
    dispatch(setExpenses(expenses));
  };
};

export default expenseSlice.reducer;
