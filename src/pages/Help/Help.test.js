import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Help from "./Help";
import React from "react";

test("renders content", () => {
  render(<Help />);

  const headerElement = screen.getByText("How can we help?");
  expect(headerElement).toBeDefined();
});
