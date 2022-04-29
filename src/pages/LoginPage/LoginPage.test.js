import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import LoginPage from "./LoginPage";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../store";

test("renders content", () => {
  render(
    <Provider store={store}>
      <Router>
        <LoginPage />
      </Router>
    </Provider>
  );

  const headerElement = screen.getByText("Sign In");
  const button = screen.getByText("SIGN IN");
  expect(headerElement).toBeDefined();
  expect(button).toBeDefined();
});
