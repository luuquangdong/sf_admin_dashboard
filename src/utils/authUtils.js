const saveLoginInfo = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    removeLoginInfo();
  }
  return token;
};

const removeLoginInfo = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export { saveLoginInfo, getToken, removeLoginInfo };
