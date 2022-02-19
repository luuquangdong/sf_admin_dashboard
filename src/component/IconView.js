import { IconButton } from "@mui/material";
import React from "react";

const IconView = ({
  onIconClick,
  icon: Icon,
  fontSize = "small",
  data,
  ...rest
}) => {
  const handleIconClicked = () => {
    if (onIconClick) onIconClick(data);
  };

  return (
    <IconButton onClick={handleIconClicked} {...rest}>
      <Icon fontSize={fontSize} />
    </IconButton>
  );
};

export default IconView;
