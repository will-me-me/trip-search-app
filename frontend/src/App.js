import React, { useState } from "react";
import TripSearchForm from "./TripSearchForm";
import TripSearchResults from "./TripSearchResults";
import TripDetails from "./TripDetails";
import { GetAllTrips } from "./api/service";

const TripSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [includeCanceled, setIncludeCanceled] = useState(false);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [trips, setTrips] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("search");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleSearch = async () => {
    setIsSearching(true);
    setError(null);
    try {
      const response = await GetAllTrips();
      const allTrips = response.data.trips;

      let filteredTrips = allTrips.filter((trip) => {
        const keywordLower = keyword.toLowerCase();
        const fieldsToSearch = [
          trip.pickup_location,
          trip.dropoff_location,
          trip.type,
          trip.driver_name,
          trip.car_make,
          trip.car_model,
          trip.car_number,
        ];

        const keywordMatch = fieldsToSearch.some((field) =>
          field.toLowerCase().includes(keywordLower)
        );

        const distanceMatch =
          !distance || trip.distance <= parseFloat(distance);
        const timeMatch = !time || trip.duration <= parseFloat(time);
        const statusMatch = includeCanceled
          ? true
          : trip.status === "COMPLETED";

        return keywordMatch && distanceMatch && timeMatch && statusMatch;
      });

      setTrips(filteredTrips);
      setCurrentScreen("results");
    } catch (error) {
      console.error("Error fetching trips", error);
      setError("Failed to fetch trips. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleBackToSearch = () => {
    setCurrentScreen("search");
  };

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
    setCurrentScreen("details");
  };

  const handleBackToResults = () => {
    setCurrentScreen("results");
  };

  switch (currentScreen) {
    case "search":
      return (
        <TripSearchForm
          keyword={keyword}
          setKeyword={setKeyword}
          includeCanceled={includeCanceled}
          setIncludeCanceled={setIncludeCanceled}
          distance={distance}
          setDistance={setDistance}
          time={time}
          setTime={setTime}
          handleSearch={handleSearch}
          isSearching={isSearching}
          error={error}
        />
      );
    case "results":
      return (
        <TripSearchResults
          trips={trips}
          onBack={handleBackToSearch}
          onTripSelect={handleTripSelect}
        />
      );
    case "details":
      return <TripDetails trip={selectedTrip} onBack={handleBackToResults} />;
    default:
      return null;
  }
};

export default TripSearch;
