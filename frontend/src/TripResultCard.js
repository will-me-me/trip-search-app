import React from "react";
import { BadgeCheck, Ban, Calendar, Clock10, Star } from "lucide-react";

const TripResultCard = ({ trip, onSelect }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div
      className="bg-white w-[360px] flex flex-col justify-between h-[200px] border border-rose-400 shadow-md rounded-xl cursor-pointer hover:shadow-lg transition-shadow relative"
      onClick={onSelect}
    >
      <div className="flex flex-col justify-between items-start p-4">
        <div className="flex items-center justify-between gap-4 w-full">
          <div>
            <p className="item-center flex gap-2 text-gray-600">
              <span className="flex gap-1">
                <Calendar className="text-gray-400" size={20} />
                {new Date(trip.pickup_date)
                  .toLocaleDateString()
                  .replace(/\//g, "-")}
              </span>
              <span className="flex gap-1">
                <Clock10 className="text-gray-400" size={20} />
                {new Date(trip.pickup_date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </p>

            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">
                {trip.driver_name}
              </h3>
              <p className="flex items-center text-xs gap-2 text-gray-600">
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
              </p>
            </div>
          </div>
          <img
            alt=""
            src={trip.driver_pic}
            className="size-16 rounded-full object-cover"
          />
        </div>

        <div>
          <p className="text-nowrap overflow-hidden text-gray-400 text-sm overflow-ellipsis whitespace-nowrap">
            From:
            <span className="text-black ml-1">
              {truncateText(trip.pickup_location, 40)}{" "}
            </span>
          </p>
          <p className="text-nowrap overflow-hidden text-gray-400 text-sm overflow-ellipsis whitespace-nowrap">
            To:
            <span className="text-black ml-1">
              {truncateText(trip.dropoff_location, 40)}{" "}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <strong
          className={`-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl px-3 py-1.5 text-white ${
            trip.status === "COMPLETED" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {trip.status === "COMPLETED" ? <BadgeCheck /> : <Ban />}
          <span className="text-[10px] font-medium sm:text-xs">
            {trip.status}
          </span>
        </strong>
      </div>
      <span className="absolute flex gap-1 left-2px -bottom-px rounded-bl-xl rounded-tr-3xl bg-gray-200 text-black px-4 py-2 font-medium uppercase tracking-widest">
        <span className="font-bold"> {trip.cost}</span>{" "}
        <span>{trip.cost_unit}</span>
      </span>
    </div>
  );
};

export default TripResultCard;
