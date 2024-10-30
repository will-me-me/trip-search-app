import React, { useCallback, useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const libraries = ["places"];

const TripMap = ({ trip }) => {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsRequested, setDirectionsRequested] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    // googleMapsApiKey: process.env.googleMapsApiKey,
    googleMapsApiKey: "",
    libraries,
  });

  useEffect(() => {
    console.log("Pickup:", trip.pickup_lat, trip.pickup_lng);
    console.log("Dropoff:", trip.dropoff_lat, trip.dropoff_lng);
    console.log(typeof trip.pickup_lat, typeof trip.pickup_lng);
  }, [trip]);

  const center = {
    lat: (trip.pickup_lat + trip.dropoff_lat) / 2,
    lng: (trip.pickup_lng + trip.dropoff_lng) / 2,
  };

  const directionsCallback = useCallback((response) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
    }
    setDirectionsRequested(true);
  }, []);

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: trip.pickup_lat, lng: trip.pickup_lng });
      bounds.extend({ lat: trip.dropoff_lat, lng: trip.dropoff_lng });
      map.fitBounds(bounds);
      setMap(map);
    },
    [trip]
  );

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: trip.pickup_lat, lng: trip.pickup_lng });
        bounds.extend({ lat: trip.dropoff_lat, lng: trip.dropoff_lng });
        map.fitBounds(bounds);
      }, 100);
    }
  }, [map, trip]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      options={{
        fullscreenControl: false,
        streetViewControl: false,
      }}
    >
      <Marker
        position={{ lat: trip.pickup_lat, lng: trip.pickup_lng }}
        icon={{
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#00FF00",
          fillOpacity: 1,
          strokeWeight: 2,
        }}
        title="Pickup Location"
        zIndex={999}
      />
      <Marker
        position={{ lat: trip.dropoff_lat, lng: trip.dropoff_lng }}
        icon={{
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#FF0000",
          fillOpacity: 1,
          strokeWeight: 2,
        }}
        title="Dropoff Location"
        zIndex={999}
      />
      {!directionsRequested && (
        <DirectionsService
          options={{
            destination: { lat: trip.dropoff_lat, lng: trip.dropoff_lng },
            origin: { lat: trip.pickup_lat, lng: trip.pickup_lng },
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
        />
      )}
      {directions && (
        <DirectionsRenderer
          options={{
            directions: directions,
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: {
              strokeColor: "#3B82F6",
              strokeWeight: 6,
              zIndex: 1,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default TripMap;
