import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../../store";

test("renders content", () => {
  const user = { user: { name: "Anna Persson" } };

  render(
    <Provider store={store}>
      <Dashboard user={user} />
    </Provider>
  );

  const headerElement = screen.getByText("Hi Anna!");
  const widgetElement = screen.getByText("TIME IN MEETINGS");
  expect(headerElement).toBeDefined();
  expect(widgetElement).toBeDefined();
});
