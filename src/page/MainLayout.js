import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AvatarNavbar from "../component/layout/AvatarNavbar";
import { Outlet } from "react-router-dom";
import Menu from "../component/layout/Menu";

const drawerWidth = 250;

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        color=""
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <AvatarNavbar />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: {
            backgroundColor: "#292d3e",
            color: "#FFF",
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Bạn chơi thể thao
          </Typography>
        </Toolbar>

        <Divider />
        <Menu />
      </Drawer>
      <Box
        component="main"
        sx={{ bgcolor: "#EEE", p: 3, flexGrow: 1, minHeight: "100vh" }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
