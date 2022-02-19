import axiosInstance from "./axiosInstance";

const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/all");

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const banUser = async (userId, ban) => {
  try {
    const response = await axiosInstance.get(`/users/ban/${userId}/${ban}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const confirmSignupOrg = async (signupOrgId, value) => {
  try {
    const response = await axiosInstance.get(
      `/users/confirm-organization/${signupOrgId}/${value}`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getAllSignupOrg = async () => {
  try {
    const response = await axiosInstance.get("/users/signup-organization");

    return response.data;
  } catch (err) {
    throw err;
  }
};

export { getUsers, banUser, getAllSignupOrg, getUser, confirmSignupOrg };
