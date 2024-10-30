import React from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Navigation2,
  Timer,
  DollarSign,
  Car,
  Star,
  Map,
} from "lucide-react";

import TripMap from "./TripMap";

const TripDetails = ({ trip, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back to Results
      </button>

      <h2 className="text-3xl font-bold mb-8">Trip Details</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={trip.car_pic}
              alt={trip.car_model}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trip Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Pick up location</p>
                  <p className="font-medium">{trip.pickup_location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Drop off location</p>
                  <p className="font-medium">{trip.dropoff_location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Request date</p>
                  <p className="font-medium">
                    {new Date(trip.request_date)
                      .toLocaleDateString()
                      .replace(/\//g, "-")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Trip times</p>
                  <p className="font-medium">
                    {new Date(trip.pickup_date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                    -
                    {new Date(trip.dropoff_date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Driver Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={trip.driver_pic}
                  alt={trip.driver_name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{trip.driver_name}</p>
                  </div>
                  <span className="flex gap-1 items-center">
                    {trip.driver_rating > 0 ? (
                      [...Array(trip.driver_rating)].map((_, index) => (
                        <Star
                          key={index}
                          className="text-yellow-500 fill-yellow-500"
                          size={15}
                        />
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">Not Rated</span>
                    )}
                    {trip.driver_rating > 0 && (
                      <span className="text-gray-400">
                        ({trip.driver_rating})
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Car className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-medium">
                    {trip.car_year} {trip.car_make} {trip.car_model}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Navigation2 className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-medium">
                    {trip.distance} {trip.distance_unit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Timer className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">
                    {trip.duration} {trip.duration_unit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Final Price</p>
                  <p className="font-medium text-lg">
                    {trip.cost} {trip.cost_unit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Map className="text-gray-600" />
          <h3 className="text-xl font-semibold">Trip Route</h3>
        </div>
        <div className="w-full  bg-gray-100 rounded-xl shadow-lg flex items-center justify-center">
          <TripMap trip={trip} />
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
