import { CircularProgress, Paper, styled } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ContentLayout from "../component/layout/ContentLayout";
import IconView from "../component/IconView";
import { DataGrid } from "@mui/x-data-grid";
import { confirmSignupOrg, getAllSignupOrg } from "../api/userApi";
import ModalDetailSignupOrg from "../component/ModalDetailSignupOrg";
import useNotification from "../utils/useNotification";

const PaperWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CenterContent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const fakeData = [
  {
    id: "001",
    idCard: {
      id: "lkdfads",
      url: "https://picsum.photos/200",
    },
    userId: "0111222333",
    createdTime: "",
  },
  {
    id: "002",
    idCard: {
      id: "lkdfads",
      url: "https://picsum.photos/200",
    },
    userId: "0222333444",
    createdTime: "",
  },
  {
    id: "003",
    idCard: {
      id: "lkdfads",
      url: "https://picsum.photos/200",
    },
    userId: "0444555666",
    createdTime: "",
  },
];

const SignupOrganizationPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const [selectedSignupOrg, setSelectedSignupOrg] = useState(null);
  const [openDetailSignupOrg, setOpenDetailSignupOrg] = useState(false);

  const notification = useNotification();

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        headerAlign: "center",
        align: "center",
        width: 200,
      },
      {
        field: "userId",
        headerName: "Id Người đăng ký",
        headerAlign: "center",
        align: "center",
        width: 200,
      },
      {
        field: "actions",
        headerName: "Hành động",
        renderCell: (params) => {
          const signupOrg = params.row;
          return (
            <div style={{ display: "flex" }}>
              <IconView
                icon={VisibilityIcon}
                onIconClick={handleViewClicked}
                data={signupOrg}
              />
            </div>
          );
        },
      },
    ],
    [data]
  );

  const handleViewClicked = (signupOrg) => {
    setSelectedSignupOrg(signupOrg);
    setOpenDetailSignupOrg(true);
  };

  const closeDetailSignupOrg = () => setOpenDetailSignupOrg(false);

  const agreeOrg = async (signOrg) => {
    try {
      await confirmSignupOrg(signOrg.id, true);

      setData(data.filter((it) => it.id !== signOrg.id));
      notification("Thao tác thành công", "success");
    } catch (err) {
      console.log({ err });
      notification("Có lỗi xảy ra, thao tác thất bại", "error");
    }
  };

  const rejectOrg = async (signOrg) => {
    try {
      await confirmSignupOrg(signOrg.id, false);

      setData(data.filter((it) => it.id !== signOrg.id));
      notification("Thao tác thành công", "success");
    } catch (err) {
      console.log({ err });
      notification("Có lỗi xảy ra, thao tác thất bại", "error");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllSignupOrg();
      // console.log(data);

      setData(data);
    } catch (e) {
      console.log({ e });
    }
    setLoading(false);
  };

  useEffect(fetchData, []);

  return (
    <ContentLayout title="Quản lý đăng ký thành tổ chức">
      <PaperWrapper>
        {loading && (
          <CenterContent>
            <CircularProgress />
          </CenterContent>
        )}
        <DataGrid
          rows={data}
          columns={columns}
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
        />
      </PaperWrapper>
      <ModalDetailSignupOrg
        open={openDetailSignupOrg}
        onClose={closeDetailSignupOrg}
        signupOrg={selectedSignupOrg}
        onAgreeClick={agreeOrg}
        onRejectClick={rejectOrg}
      />
    </ContentLayout>
  );
};

export default SignupOrganizationPage;
