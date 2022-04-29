import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Expenses from "./Expenses";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../../store";

test("renders content", () => {
  const expense = [
    {
      _id: "626123f41752ad896240b6b0",
      date: "2022-02-01",
      merchant: "Espresso House",
      amount: 30,
      currency: "SEK",
      employee: {
        _id: "345f3e9098b3b34223d43f6e",
        name: "Ellen Tidsted",
      },
      status: "Approved",
    },
  ];

  render(
    <Provider store={store}>
      <Expenses dataset={expense} />
    </Provider>
  );

  const headerElement = screen.getByText(
    "Displaying information for all expenses you have logged. For more information, please contact HR."
  );
  const employeeElement = screen.getAllByText("Espresso House");
  expect(headerElement).toBeDefined();
  expect(employeeElement).toBeDefined();
});
