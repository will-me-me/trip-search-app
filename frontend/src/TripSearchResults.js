import React from "react";
import TripResultCard from "./TripResultCard";

const TripSearchResults = ({ trips, onBack, onTripSelect }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Back to Search
      </button>
      <h2 className="text-2xl font-bold mb-6">Trips ({trips.length})</h2>
      <div className="space-y-4  justify- flex gap-4 flex-wrap">
        {trips.map((trip) => (
          <TripResultCard
            key={trip.id}
            trip={trip}
            onSelect={() => onTripSelect(trip)}
          />
        ))}
      </div>
    </div>
  );
};

export default TripSearchResults;
