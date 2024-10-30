const request = require("supertest");
const express = require("express");
const app = express();

const mockTrips = [
  {
    id: 608,
    status: "COMPLETED",
    pickup_location: "St James, Nairobi",
    dropoff_location: "Nextgen Mall, Nairobi",
    driver_name: "Alize",
    car_make: "Honda",
  },
  {
    id: 585,
    status: "CANCELED",
    pickup_location: "Manyanja, Nairobi",
    dropoff_location: "St James, Nairobi",
    driver_name: "Richard",
    car_make: "Nissan",
  },
];

app.get("/api/trips", (req, res) => {
  const { status, driver_name, pickup_location } = req.query;

  let filteredTrips = mockTrips;

  if (status) {
    filteredTrips = filteredTrips.filter(
      (trip) => trip.status === status.toUpperCase()
    );
  }

  if (driver_name) {
    filteredTrips = filteredTrips.filter((trip) =>
      trip.driver_name.toLowerCase().includes(driver_name.toLowerCase())
    );
  }

  if (pickup_location) {
    filteredTrips = filteredTrips.filter((trip) =>
      trip.pickup_location.toLowerCase().includes(pickup_location.toLowerCase())
    );
  }

  res.json(filteredTrips);
});

describe("GET /api/trips", () => {
  it("should return all trips with correct structure and status", async () => {
    const res = await request(app).get("/api/trips");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);

    const trip1 = res.body[0];
    expect(trip1.pickup_location).toEqual("St James, Nairobi");
    expect(trip1.driver_name).toEqual("Alize");
    expect(trip1.car_make).toEqual("Honda");
    expect(trip1.status).toEqual("COMPLETED");

    const trip2 = res.body[1];
    expect(trip2.pickup_location).toEqual("Manyanja, Nairobi");
    expect(trip2.driver_name).toEqual("Richard");
    expect(trip2.car_make).toEqual("Nissan");
    expect(trip2.status).toEqual("CANCELED");
  });

  it("should return an empty array when no trips are available", async () => {
    const app = express();
    app.get("/api/trips", (req, res) => {
      res.json([]);
    });

    const res = await request(app).get("/api/trips");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
    expect(res.body).toHaveLength(0);
  });

  it("should return trips filtered by status (COMPLETED)", async () => {
    const res = await request(app).get("/api/trips?status=COMPLETED");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].status).toEqual("COMPLETED");
    expect(res.body[0].pickup_location).toEqual("St James, Nairobi");
  });

  it("should return trips filtered by status (CANCELED)", async () => {
    const res = await request(app).get("/api/trips?status=CANCELED");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].status).toEqual("CANCELED");
    expect(res.body[0].pickup_location).toEqual("Manyanja, Nairobi");
  });

  it("should return trips filtered by driver_name", async () => {
    const res = await request(app).get("/api/trips?driver_name=Richard");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].driver_name).toEqual("Richard");
  });

  it("should return trips filtered by pickup_location", async () => {
    const res = await request(app).get("/api/trips?pickup_location=Manyanja");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].pickup_location).toEqual("Manyanja, Nairobi");
  });

  it("should return an empty array when filtering by a non-existing status", async () => {
    const res = await request(app).get("/api/trips?status=NON_EXISTENT_STATUS");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0);
  });

  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/unknown");

    expect(res.statusCode).toEqual(404);
  });

  it("should return trips when no filters are applied", async () => {
    const res = await request(app).get("/api/trips");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });
});
