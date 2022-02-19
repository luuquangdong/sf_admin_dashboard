import React from "react";
import jwt_decode from "jwt-decode";
import { useRecoilValue } from "recoil";
import { Navigate, useLocation } from "react-router-dom";
import userState from "../recoil/userState";
import { removeLoginInfo } from "../utils/authUtils";

export const RequireAuth = ({ children }) => {
  const user = useRecoilValue(userState);
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token || !user) {
    removeLoginInfo();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const payload = jwt_decode(token);
  if (payload.exp < Date.now() / 1000 || payload.role !== "ROLE_ADMIN") {
    removeLoginInfo();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
