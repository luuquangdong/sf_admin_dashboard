import React from "react";
import PrePage from "../PrePage";
import ContentLayout from "./ContentLayout";

const LayoutWithPrePage = ({ title, children, prePageTitle }) => {
  return (
    <>
      <PrePage title={prePageTitle} />
      <ContentLayout title={title}>{children}</ContentLayout>
    </>
  );
};

export default LayoutWithPrePage;
