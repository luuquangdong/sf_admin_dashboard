import { CircularProgress, Paper, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import { banUser, getUsers } from "../api/userApi";
import ContentLayout from "../component/layout/ContentLayout";
import IconConfirm from "../component/IconConfirm";
import useNotification from "../utils/useNotification";

const GENDER = { MALE: "Nam", FEMALE: "Nữ", OTHER: "Khác" };

const PaperWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CenterContent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const AccountManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const notification = useNotification();

  const handleAgreeConfirmClicked = async (user) => {
    try {
      let u = await banUser(user.phoneNumber, !user.banned);
      u.id = u.phoneNumber;

      const uIndex = users.findIndex(
        (ux) => ux.phoneNumber === user.phoneNumber
      );
      const data = [...users.slice(0, uIndex), u, ...users.slice(uIndex + 1)];
      setUsers(data);

      notification("Thao tác thành công", "success");
    } catch (err) {
      console.log(err);
      notification("Có lỗi xảy ra, thao tác thất bại", "error");
    }
  };

  const columns = useMemo(
    () => [
      {
        field: "phoneNumber",
        headerName: "Số điện thoại",
        headerAlign: "center",
        align: "center",
        width: 150,
        flex: 0.5,
        filterable: true,
      },
      {
        field: "name",
        headerName: "Họ tên",
        headerAlign: "center",
        width: 200,
        flex: 1,
      },
      {
        field: "role",
        headerName: "Vai trò",
        headerAlign: "center",
        width: 120,
        renderCell: (params) => <div>{params.value.replace("ROLE_", "")}</div>,
      },
      {
        field: "gender",
        headerName: "Giới tính",
        headerAlign: "center",
        maxWidth: 100,
        renderCell: (params) => <div>{GENDER[params.value]}</div>,
      },
      {
        field: "birthday",
        headerName: "Ngày sinh",
        headerAlign: "center",
        maxWidth: 100,
        renderCell: (params) => <div>{params.value}</div>,
      },
      {
        field: "banned",
        headerName: "Trạng thái",
        headerAlign: "center",
        width: 120,
        filterable: true,
        renderCell: (params) => (
          <div>{params.value ? "Khóa" : "Hoạt động"}</div>
        ),
        renderCell: (params) =>
          params.value ? (
            <div style={{ color: "#F87060" }}>Khóa</div>
          ) : (
            <div style={{ color: "green" }}>Hoạt động</div>
          ),
      },
      {
        field: "actions",
        headerName: "Hành động",
        flex: 1,
        renderCell: (params) => {
          const user = params.row;
          if (user.role === "ROLE_ADMIN") return null;
          return (
            <IconConfirm
              icon={user.banned ? LockOpenOutlinedIcon : LockRoundedIcon}
              titleConfirm="Xác nhận"
              contentConfirm={`Bạn muốn${
                user.banned ? " mở " : " "
              }khóa tài khoản có sđt: ${user.phoneNumber}?`}
              onAgreeClick={handleAgreeConfirmClicked}
              data={user}
            />
          );
        },
      },
    ],
    [users]
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = await getUsers();
      data = data.map((item) => ({ ...item, id: item.phoneNumber }));
      // console.log(data);
      setUsers(data);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(fetchData, []);

  return (
    <ContentLayout title="Quản lý tài khoản">
      <PaperWrapper elevation={4}>
        {loading && (
          <CenterContent>
            <CircularProgress />
          </CenterContent>
        )}
        <DataGrid
          columns={columns}
          rows={users}
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
        />
      </PaperWrapper>
    </ContentLayout>
  );
};

export default AccountManagementPage;
