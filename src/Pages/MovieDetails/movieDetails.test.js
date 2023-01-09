import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MovieDetails from "./movieDetails.jsx";

test("loads and displays greeting", async () => {
  // ARRANGE
  const { container } = render(<MovieDetails />);
  expect(container).toBeDefined();
});
