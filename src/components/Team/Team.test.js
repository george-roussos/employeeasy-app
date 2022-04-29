import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import React from "react";
import Team from "./Team";
import { store } from "../../store";

test("renders content", () => {
  const user = { user: { name: "Anna Persson" } };

  const employee = [
    {
      name: "Test Testsson",
      phone: "+46723333333",
      email: "Test Testsson",
      department: "Finance",
      startDate: "2019-02-02",
      employmentType: "Permanent",
      manager: {
        _id: "62581a21001f0871c9e10a89",
        name: "Anna Persson",
      },
    },
  ];

  render(
    <Provider store={store}>
      <Team dataset={employee} user={user} />
    </Provider>
  );

  const headerElement = screen.getByText(
    "Displaying information for your team."
  );
  const employeeElement = screen.getAllByText("Test Testsson");
  expect(headerElement).toBeDefined();
  expect(employeeElement).toBeDefined();
});
