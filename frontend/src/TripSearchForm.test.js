import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TripSearchForm from "./TripSearchForm";

describe("TripSearchForm", () => {
  const defaultProps = {
    keyword: "",
    setKeyword: jest.fn(),
    includeCanceled: false,
    setIncludeCanceled: jest.fn(),
    distance: "",
    setDistance: jest.fn(),
    time: "",
    setTime: jest.fn(),
    handleSearch: jest.fn(),
    isSearching: false,
    error: null,
  };

  const renderTripSearchForm = (props = {}) => {
    return render(<TripSearchForm {...defaultProps} {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders form elements", () => {
    renderTripSearchForm();
    expect(screen.getByLabelText(/Keyword/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Include canceled trips/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Maximum Distance \(km\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Maximum Time \(minutes\)/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  test("calls handleSearch when the form is submitted", () => {
    renderTripSearchForm();
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    expect(defaultProps.handleSearch).toHaveBeenCalledTimes(1);
  });

  test("updates input values", () => {
    renderTripSearchForm();

    const keywordInput = screen.getByLabelText(/Keyword/i);
    fireEvent.change(keywordInput, { target: { value: "test keyword" } });
    expect(defaultProps.setKeyword).toHaveBeenCalledWith("test keyword");

    const distanceInput = screen.getByLabelText(/Maximum Distance \(km\)/i);
    fireEvent.change(distanceInput, { target: { value: "10" } });
    expect(defaultProps.setDistance).toHaveBeenCalledWith(10);

    const timeInput = screen.getByLabelText(/Maximum Time \(minutes\)/i);
    fireEvent.change(timeInput, { target: { value: "30" } });
    expect(defaultProps.setTime).toHaveBeenCalledWith(30);

    const includeCanceledCheckbox = screen.getByLabelText(
      /Include canceled trips/i
    );
    fireEvent.click(includeCanceledCheckbox);
    expect(defaultProps.setIncludeCanceled).toHaveBeenCalledWith(true);
  });

  test("displays loading state", () => {
    renderTripSearchForm({ isSearching: true });
    expect(
      screen.getByRole("button", { name: /Searching\.\.\./i })
    ).toBeInTheDocument();
  });

  test("displays error message when error prop is provided", () => {
    const errorMessage = "Something went wrong";
    renderTripSearchForm({ error: errorMessage });
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
