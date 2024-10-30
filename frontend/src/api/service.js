import instance from "./axios";

export const GetAllTrips = async () => {
  let response = await instance.get("api/trips", {});
  return response;
};
