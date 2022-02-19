import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ReportIcon from "@mui/icons-material/Report";
import SportsIcon from "@mui/icons-material/Sports";

const menuConfig = [
  {
    icon: DashboardIcon,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: PeopleAltIcon,
    title: "Quản lý tài khoản",
    path: "/account-management",
  },
  {
    icon: LibraryBooksIcon,
    title: "Quản lý bài viết",
    path: "/post-management",
  },
  {
    icon: ReportIcon,
    title: "Quản lý phản hồi",
    path: "/report-management",
  },
  {
    icon: AssignmentIndIcon,
    title: "QL đăng ký tổ chức",
    path: "/signup-organization-management",
  },
  {
    icon: SportsIcon,
    title: "Quản lý môn thể thao",
    path: "/sport-management",
  },
];

function Menu() {
  const navigate = useNavigate();
  const handleItemClicked = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <List>
      {menuConfig.map(({ title, icon: Icon, path }) => {
        const selected = window.location.pathname === path;
        return (
          <ListItemButton
            key={title}
            onClick={handleItemClicked.bind(null, path)}
            selected={selected}
          >
            <ListItemIcon sx={{ color: selected ? "#FFF" : "#CCC" }}>
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={title}
              sx={{ color: selected ? "#FFF" : "#CCC" }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default React.memo(Menu);
