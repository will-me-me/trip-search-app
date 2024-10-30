import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const GetAllTrips = async () => {
  let response = await instance.get("api/trips", {});
  return response.data.trips;
};
