import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TripSearchResults from "./TripSearchResults";
// import { act } from "react";

// Mock trips
const mockTrips = [
  { id: 1, pickup_location: "A", dropoff_location: "B" },
  { id: 2, pickup_location: "C", dropoff_location: "D" },
];

// Mock the TripResultCard component
jest.mock("./TripResultCard", () => ({ trip, onSelect }) => (
  <div onClick={() => onSelect(trip)}>
    {trip.pickup_location} to {trip.dropoff_location}
  </div>
));

describe("TripSearchResults", () => {
  test("renders trip results", () => {
    render(<TripSearchResults trips={mockTrips} />);

    expect(screen.getByText(/A/)).toBeInTheDocument();
    expect(screen.getAllByText(/B/)[1]).toBeInTheDocument();
    expect(screen.getByText(/C/)).toBeInTheDocument();
    expect(screen.getByText(/D/)).toBeInTheDocument();
  });

  test("calls onBack when back button is clicked", () => {
    const mockOnBack = jest.fn();
    render(<TripSearchResults trips={mockTrips} onBack={mockOnBack} />);

    fireEvent.click(screen.getByText(/Back/i));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test("calls onTripSelect when a trip is selected", () => {
    const mockOnTripSelect = jest.fn();
    render(
      <TripSearchResults trips={mockTrips} onTripSelect={mockOnTripSelect} />
    );

    fireEvent.click(screen.getByText(/A/));
    expect(mockOnTripSelect).toHaveBeenCalledTimes(1);
    expect(mockOnTripSelect).toHaveBeenCalledWith(mockTrips[0]);
  });
});
