import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "./SignUp";
import { store } from "../../store";

test("renders content", () => {
  render(
    <Provider store={store}>
      <Router>
        <SignUp />
      </Router>
    </Provider>
  );

  const headerElement = screen.getByText("Sign Up");
  const button = screen.getByText("SIGN UP");
  const image = screen.getByRole("img");
  expect(headerElement).toBeDefined();
  expect(button).toBeDefined();
  expect(image).toBeDefined();
});
