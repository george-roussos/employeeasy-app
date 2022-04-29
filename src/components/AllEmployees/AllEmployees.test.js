import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import AllEmployees from "./AllEmployees";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../../store";

test("renders content", () => {
  const employee = [
    {
      name: "Test Testsson",
      phone: "+46723333333",
      email: "Test Testsson",
      department: "Finance",
      startDate: "2019-02-02",
      employmentType: "Permanent",
    },
  ];

  render(
    <Provider store={store}>
      <AllEmployees dataset={employee} />
    </Provider>
  );

  const headerElement = screen.getByText(
    "Displaying information for all employees. Note: You can only perform actions on your team members."
  );
  const employeeElement = screen.getAllByText("Test Testsson");
  expect(headerElement).toBeDefined();
  expect(employeeElement).toBeDefined();
});
