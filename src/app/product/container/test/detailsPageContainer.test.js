import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useLocation, BrowserRouter } from "react-router-dom";
import DetailsPageContainer from "../detailsPageContainer";

// Mock the useLocation hook from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

test("renders Detail Container with correct state", () => {
  const mockState = {
    item: {
      name: "Test University",
      country: "Test Country",
      alpha_two_code: "TC",
      web_pages: ["https://testuniversity.com"],
      "state-province": "Test State",
    },
  };

  // Mockup useLocation
  useLocation.mockReturnValue({
    state: mockState,
  });

  render(
    <BrowserRouter>
      <DetailsPageContainer />
    </BrowserRouter>
  );

  // Check if Comp is rendered with right props
  expect(screen.getByText(/Details Page/i)).toBeInTheDocument();
  expect(screen.getByText(/Test University/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Country/i)).toBeInTheDocument();
  expect(screen.getByText(/TC/i)).toBeInTheDocument();
  expect(screen.getByText(/Test State/i)).toBeInTheDocument();
  expect(screen.getByText("https://testuniversity.com")).toBeInTheDocument();
});
