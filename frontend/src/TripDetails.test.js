import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TripDetails from "./TripDetails";

// Mock the TripMap component to avoid testing implementation of TripMap
jest.mock("./TripMap", () => () => <div data-testid="mock-trip-map">Map</div>);

const mockTrip = {
  id: 608,
  status: "COMPLETED",
  request_date: "2019-08-16 10:49:25",
  pickup_lat: -1.3234923,
  pickup_lng: 36.8435638,
  pickup_location: "St James, Nairobi",
  dropoff_lat: -1.323413,
  dropoff_lng: 36.8434199,
  dropoff_location: "Nextgen Mall, Nairobi",
  pickup_date: "2019-08-16 10:50:32",
  dropoff_date: "2019-08-16 11:26:32",
  type: "Lady",
  driver_id: 13,
  driver_name: "Alize",
  driver_rating: 5,
  driver_pic: "https://rapidtechinsights.github.io/hr-assignment/p13.jpg",
  car_make: "Honda",
  car_model: "Civic",
  car_number: "KCR-100P",
  car_year: 2012,
  car_pic: "https://rapidtechinsights.github.io/hr-assignment/c13.jpg",
  duration: 36,
  duration_unit: "min",
  distance: 1.54,
  distance_unit: "km",
  cost: 253,
  cost_unit: "KES",
};

describe("TripDetails", () => {
  test("renders trip details correctly", () => {
    render(<TripDetails trip={mockTrip} />);

    // Check pickup and dropoff locations
    expect(screen.getByText("St James, Nairobi")).toBeInTheDocument();
    expect(screen.getByText("Nextgen Mall, Nairobi")).toBeInTheDocument();

    // Check driver name and rating
    expect(screen.getByText("Alize")).toBeInTheDocument();
    expect(screen.getByAltText("Alize")).toBeInTheDocument(); // Driver picture

    // Check car details
    expect(screen.getByText("2012 Honda Civic")).toBeInTheDocument();

    // Check distance and duration
    expect(screen.getByText("1.54 km")).toBeInTheDocument();
    expect(screen.getByText("36 min")).toBeInTheDocument();

    // Check cost
    expect(screen.getByText("253 KES")).toBeInTheDocument();

    // Check trip map rendering
    expect(screen.getByTestId("mock-trip-map")).toBeInTheDocument();
  });

  test('calls onBack when "Back to Results" button is clicked', () => {
    const mockOnBack = jest.fn();
    render(<TripDetails trip={mockTrip} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText(/Back to Results/i));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test("renders trip dates and times correctly", () => {
    render(<TripDetails trip={mockTrip} />);

    expect(screen.getByText("16-08-2019")).toBeInTheDocument(); // Formatted request date

    expect(
      screen.getByText(
        (content, element) =>
          content.includes("10:50 AM") && content.includes("11:26 AM")
      )
    ).toBeInTheDocument();
  });
});
