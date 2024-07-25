import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import ListPageContainer from "../listPageContainer";
import { getDetails } from "../../../../services/apiService";
import { MemoryRouter } from "react-router-dom";

// Mock the getDetails function from apiService
jest.mock("../../../../services/apiService");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("ListPageContainer", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test("renders loading state initially", () => {
    render(<ListPageContainer />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders data after successful fetch", async () => {
    const mockData = [
      {
        name: "University 1",
        country: "Country 1",
        alpha_two_code: "C1",
        web_pages: ["https://university1.com"],
      },
      {
        name: "University 2",
        country: "Country 2",
        alpha_two_code: "C2",
        web_pages: ["https://university2.com"],
      },
    ];

    getDetails.mockResolvedValueOnce(mockData);

    await act(async () => {
      render(
        <MemoryRouter>
          <ListPageContainer />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(getDetails).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Country 1")).toBeInTheDocument();
    expect(screen.getByText("C1")).toBeInTheDocument();
    expect(screen.getByText("https://university1.com")).toBeInTheDocument();

    // Additional check for the second item
    expect(screen.getByText("University 2")).toBeInTheDocument();
    expect(screen.getByText("Country 2")).toBeInTheDocument();
    expect(screen.getByText("C2")).toBeInTheDocument();
    expect(screen.getByText("https://university2.com")).toBeInTheDocument();
  });

  test("renders cached data if fetch fails", async () => {
    const cachedData = [
      {
        name: "Cached University",
        country: "Cached Country",
        alpha_two_code: "CC",
        web_pages: ["https://cacheduniversity.com"],
      },
    ];

    localStorage.setItem("universities", JSON.stringify(cachedData));
    getDetails.mockRejectedValueOnce(new Error("Fetch failed"));

    await act(async () => {
      render(
        <MemoryRouter>
          <ListPageContainer />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(getDetails).toHaveBeenCalled();
    });
    expect(screen.getByText("Cached Country")).toBeInTheDocument();
    expect(screen.getByText("CC")).toBeInTheDocument();
    expect(
      screen.getByText("https://cacheduniversity.com")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Failed to fetch new data, loaded cached data./i)
    ).toBeInTheDocument();
  });

  test("renders error message if fetch fails and no cached data", async () => {
    getDetails.mockRejectedValueOnce(new Error("Fetch failed"));

    await act(async () => {
      render(
        <MemoryRouter>
          <ListPageContainer />
        </MemoryRouter>
      );
    });
    await waitFor(() => expect(getDetails).toHaveBeenCalledTimes(1));

    expect(
      screen.getByText(
        /Failed to fetch universities and no cached data available./i
      )
    ).toBeInTheDocument();
  });
});
