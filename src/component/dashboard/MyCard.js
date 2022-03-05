import { Box } from "@mui/material";
import React from "react";

function MyCard({ header, number = 0 }) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 200,
      }}
    >
      <Box sx={{ color: "text.secondary", textAlign: "center" }}>{header}</Box>
      <Box
        sx={{
          color: "text.primary",
          fontSize: "2rem",
          fontWeight: "medium",
          textAlign: "center",
        }}
      >
        {number}
      </Box>
    </Box>
  );
}

export default MyCard;
