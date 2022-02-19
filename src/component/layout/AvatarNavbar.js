import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import userState from "../../recoil/userState";
import { removeLoginInfo } from "../../utils/authUtils";

export default function AvatarNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClicked = () => {
    removeLoginInfo();
    handleClose();
    navigate("/login");
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar alt={user.name} src={user.avatar?.url} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Thông tin tài khoản</MenuItem>
        <MenuItem onClick={handleLogoutClicked}>Đăng xuất</MenuItem>
      </Menu>
    </>
  );
}
