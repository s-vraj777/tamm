import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import DetailsPageComponent from "../detailsPageComponent";
import { BrowserRouter as Router } from "react-router-dom";

const mockData = {
  name: "Mohamed bin Zayed University of Artificial Intelligence",
  country: "United Arab Emirates",
  alpha_two_code: "AE",
  "state-province": "Abu Dhabi",
  web_pages: ["https://mbzuai.ac.ae/"]
};

const mockDataWithoutStateProvince = {
  name: "Some University",
  country: "Some Country",
  alpha_two_code: "SC",
  web_pages: ["https://someurl.com/"]
};

test("renders details page with data", () => {
  render(
    <Router>
      <DetailsPageComponent state={mockData} />
    </Router>
  );

  // Check if the data is rendered correctly
  expect(screen.getByText(/Mohamed bin Zayed University of Artificial Intelligence/i)).toBeInTheDocument();
  expect(screen.getByText(/United Arab Emirates/i)).toBeInTheDocument();
  expect(screen.getByText(/Abu Dhabi/i)).toBeInTheDocument();
  expect(screen.getByText(/https:\/\/mbzuai.ac.ae\//i)).toBeInTheDocument();
});

test("renders details page without state province", () => {
  render(
    <Router>
      <DetailsPageComponent state={mockDataWithoutStateProvince} />
    </Router>
  );

  // Check if 'NA' is displayed when state province is not provided
  expect(screen.getByText(/NA/i)).toBeInTheDocument();  // Check for 'NA'
});


test("with No Data", () => {
    render(
      <Router>
        <DetailsPageComponent state={[]} />
      </Router>
    );
  
    // Check if 'NA' is displayed when state province is not provided
    expect(screen.getByText(/No Data Found/i)).toBeInTheDocument();  // Check for 'NA'
  });
