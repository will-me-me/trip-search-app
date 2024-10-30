import React from "react";

const TripSearchForm = ({
  keyword,
  setKeyword,
  includeCanceled,
  setIncludeCanceled,
  distance,
  setDistance,
  time,
  setTime,
  handleSearch,
  isSearching,
  error,
}) => {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-bold sm:text-3xl underline underline-offset-4">
            Trip Search
          </h1>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label
              htmlFor="keyword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Keyword
            </label>
            <input
              id="keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="includeCanceled"
              type="checkbox"
              checked={includeCanceled}
              onChange={(e) => setIncludeCanceled(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="includeCanceled"
              className="text-sm font-medium text-gray-700"
            >
              Include canceled trips
            </label>
          </div>
          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Maximum Distance (km)
            </label>
            <input
              id="distance"
              type="number"
              min="0"
              value={distance}
              onChange={(e) => setDistance(Math.max(0, e.target.value))}
              placeholder="Enter max distance"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Maximum Time (minutes)
            </label>
            <input
              id="time"
              type="number"
              min="0"
              value={time}
              onChange={(e) => setTime(Math.max(0, e.target.value))}
              placeholder="Enter max time"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
        {error && (
          <div className="max-w-md mx-auto mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="/bg.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default TripSearchForm;
