import axiosInstance from "./axiosInstance";

const getAllReports = async () => {
  try {
    const response = await axiosInstance.get("/posts/list-report");

    return response.data;
  } catch (err) {
    throw err;
  }
};

const deleteReport = async (reportId) => {
  console.log(reportId);
  if (!reportId) return;
  try {
    const response = await axiosInstance.delete(`/posts/report/${reportId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export { getAllReports, deleteReport };
