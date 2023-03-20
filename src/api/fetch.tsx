import axios from "axios";

export const getTours = async () => {
  const response = await axios.get("http://localhost:3001/bootcamps");
  return response;
};

export const getGuides = async () => {
  const response = await axios.get("http://localhost:3001/instructors");
  return response;
};

export const getTourists = async () => {
  const response = await axios.get("http://localhost:3001/developers");
  return response;
};

export const addNewTourist = async (
  fname: string,
  lname: string,
  tourId: string
) => {
  const response = await axios.post("http://localhost:3001/developers", {
    name: `${fname} ${lname}`,
    tourId: tourId,
  });
  return response.data.developer;
};

export const deleteTourist = async (touristId: string) => {
  const response = await axios.delete(
    `http://localhost:3001/developers/${touristId}`
  );
  return response;
};
