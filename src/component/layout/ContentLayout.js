import { styled } from "@mui/material";
import React from "react";

const Title = styled("div")({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const Spacer = styled("div")({
  height: "10px",
});

const ContentLayout = ({ title, children }) => {
  return (
    <>
      <Title>{title}</Title>
      <Spacer />
      {children}
    </>
  );
};

export default ContentLayout;
