import axiosInstance from "./axiosInstance";

const getAllSports = async () => {
  try {
    const response = await axiosInstance.get("/sports");

    return response.data;
  } catch (err) {
    throw err;
  }
};

const deleteSport = async (sportId) => {
  if (!sportId) return;
  try {
    const response = await axiosInstance.delete(`/sports/${sportId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const editSport = async (sport) => {
  if (!sport) return;
  try {
    const response = await axiosInstance.put(`/sports/${sport.id}`, sport);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const addSport = async (name) => {
  if (!name) return;
  try {
    const response = await axiosInstance.post("/sports", { name });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export { getAllSports, deleteSport, addSport, editSport };
