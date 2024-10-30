import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom"; // Import jest-dom for additional matchers

test("renders App component", () => {
  render(<App />);
  const tripSearchElement = screen.getByText(/Trip Search/i);
  expect(tripSearchElement).toBeInTheDocument();
});
