import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllReports } from "../api/reportApi";
import { getAllSignupOrg, getUsers } from "../api/userApi";
import MyCard from "../component/dashboard/MyCard";
import VisitorChart from "../component/dashboard/VisitorChart";

const Space = styled("div")(({ theme }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
}));

const DashboardPage = () => {
  const [online, setOnline] = useState(16);
  const [accountsNumber, setAccountsNumber] = useState(0);
  const [reportsNumber, setReportsNumber] = useState(0);
  const [signupOrgNumber, setSignupOrgNumber] = useState(0);

  useEffect(() => {
    getUsers()
      .then((data) => setAccountsNumber(data.length))
      .catch((err) => console.log(err));

    getAllReports()
      .then((data) => setReportsNumber(data.length))
      .catch((err) => console.log(err));

    getAllSignupOrg()
      .then((data) => setSignupOrgNumber(data.length))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <MyCard header="Đang online" number={online} />
        <Space />
        <MyCard header="Tổng số tài khoản" number={accountsNumber} />
        <Space />
        <MyCard header="Tổng số phản hồi" number={reportsNumber} />
        <Space />
        <MyCard header="Tổng số đăng ký tổ chức" number={signupOrgNumber} />
      </Box>
      <Space />
      <Space />
      <Box>
        <VisitorChart />
      </Box>
    </Box>
  );
};

export default DashboardPage;
