import axiosInstance from "./axiosInstance";

const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts/all");

    return response.data;
  } catch (err) {
    throw err;
  }
};

const banPost = async (postId, value) => {
  try {
    const response = await axiosInstance.get(`/posts/ban/${postId}/${value}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getPost = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getComments = async (postId, page = 1, size = 10) => {
  // api page start at 0, materil page start at 1
  try {
    const response = await axiosInstance.get(
      `/comments?postId=${postId}&page=${page - 1}&size=${size}`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export { getAllPosts, banPost, getPost, getComments };
