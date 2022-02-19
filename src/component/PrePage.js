import { styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const MyLink = styled("div")({
  cursor: "pointer",
  ":hover": {
    textDecoration: "underline",
  },
});

const PrePage = ({ title = "< Trở lại trang trước" }) => {
  const navigate = useNavigate();
  return <MyLink onClick={() => navigate(-1)}>{title}</MyLink>;
};

export default PrePage;
