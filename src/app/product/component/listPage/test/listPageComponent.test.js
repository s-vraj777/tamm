import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListPageComponent from "../listPageComponent";
import { BrowserRouter as Router } from "react-router-dom";

// Mock function for handleDelete
const mockHandleDelete = jest.fn();

const mockItems = [
  {
    name: "University A",
    country: "Country A",
    alpha_two_code: "A",
    web_pages: ["https://universityA.com"],
  },
  {
    name: "University B",
    country: "Country B",
    alpha_two_code: "B",
    web_pages: ["https://universityB.com"],
  },
];

test("renders list page with items", () => {
  render(
    <Router>
      <ListPageComponent
        items={mockItems}
        isLoading={false}
        handleDelete={mockHandleDelete}
      />
    </Router>
  );

  expect(screen.getByText(/Universities/i)).toBeInTheDocument();
  expect(screen.getByText(/University A/i)).toBeInTheDocument();
  expect(screen.getByText(/University B/i)).toBeInTheDocument();
});

test("handles search input", () => {
  render(
    <Router>
      <ListPageComponent
        items={mockItems}
        isLoading={false}
        handleDelete={mockHandleDelete}
      />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Search.../i), {
    target: { value: "A" },
  });

  expect(screen.getByText(/University A/i)).toBeInTheDocument();
  expect(screen.queryByText(/University B/i)).toBeNull();
});

test("handles sort functionality", () => {
  const { container, getByTestId } = render(
    <Router>
      <ListPageComponent
        items={mockItems}
        isLoading={false}
        handleDelete={mockHandleDelete}
      />
    </Router>
  );

  // Test default sort order (Select Order)
  expect(screen.getAllByRole("row")[1].textContent).toContain("University A");
  expect(container.getElementsByClassName("filter-select").length).toBe(1);

  fireEvent.change(getByTestId("sort-select"), {
    target: { value: "Z-A" },
  });

  // After sorting Z-A, University B should come before University A
  expect(screen.getAllByRole("row")[1].textContent).toContain("University B");
});

test("handles delete functionality", async () => {
  render(
    <Router>
      <ListPageComponent
        items={mockItems}
        isLoading={false}
        handleDelete={mockHandleDelete}
      />
    </Router>
  );

  fireEvent.click(screen.getByTestId("delete-University A"));

  // Ensure the delete function is called
  await waitFor(() => {
    expect(mockHandleDelete).toHaveBeenCalledWith("University A");
  });
});

test("displays loading message when loading", () => {
  render(
    <Router>
      <ListPageComponent
        items={[]}
        isLoading={true}
        handleDelete={mockHandleDelete}
      />
    </Router>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("displays no data message when no data and not loading", () => {
  render(
    <Router>
      <ListPageComponent
        items={[]}
        isLoading={false}
        handleDelete={mockHandleDelete}
      />
    </Router>
  );

  expect(screen.getByText(/No Data Found/i)).toBeInTheDocument();
});
