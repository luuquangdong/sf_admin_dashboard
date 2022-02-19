import axiosInstance from "./axiosInstance";

const login = async (phoneNumber, password) => {
  try {
    const response = await axiosInstance.post("/auth/admin-login", {
      phoneNumber,
      password,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export { login };
