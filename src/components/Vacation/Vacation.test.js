import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import React from "react";
import Vacation from "./Vacation";
import { store } from "../../store";

test("renders content", () => {
  const vacation = [
    {
      _id: "432136860f5c84e3a3edc64b",
      employee: {
        _id: "625f3e9098b3b84205d96f9e",
        name: "Martin Testsson",
      },
      startOn: "2022-08-06",
      endOn: "2022-08-16",
      daysLeft: 9,
      status: "Approved",
    },
  ];

  render(
    <Provider store={store}>
      <Vacation dataset={vacation} />
    </Provider>
  );

  const headerElement = screen.getByText(
    "Displaying information for all vacation you have logged. For more information, please contact HR or employee."
  );
  const employeeElement = screen.getAllByText("Martin Testsson");
  expect(headerElement).toBeDefined();
  expect(employeeElement).toBeDefined();
});
