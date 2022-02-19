import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AccountManagementPage from "../page/AccountManagementPage";
import DashboardPage from "../page/DashboardPage";
import DetailPostPage from "../page/DetailPostPage";
import LoginPage from "../page/LoginPage";
import MainLayout from "../page/MainLayout";
import PostManagementPage from "../page/PostManagementPage";
import ReportManagementPage from "../page/ReportManagementPage";
import SignupOrganizationPage from "../page/SignupOrganizationPage";
import SportManagementPage from "../page/SportManagementPage";
import { RequireAuth } from "./RequireAuth";

function MainRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/notfound" element={<NotFound />} /> */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashBoardNav />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="account-management" element={<AccountManagementPage />} />
        <Route path="post-management" element={<PostManagementPage />} />
        <Route path="posts/:postId" element={<DetailPostPage />} />
        <Route path="report-management" element={<ReportManagementPage />} />
        <Route path="sport-management" element={<SportManagementPage />} />
        <Route
          path="signup-organization-management"
          element={<SignupOrganizationPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default MainRoute;

const DashBoardNav = () => <Navigate to="/dashboard" replace />;

const NotFound = () => {
  let location = useLocation();
  return <h1>{location.pathname} Not Found</h1>;
};
