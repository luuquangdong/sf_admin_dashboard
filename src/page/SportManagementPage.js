import { Box, Button, CircularProgress, Paper, styled } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ContentLayout from "../component/layout/ContentLayout";
import IconView from "../component/IconView";
import { DataGrid } from "@mui/x-data-grid";
import IconConfirm from "../component/IconConfirm";
import {
  addSport,
  deleteSport,
  editSport,
  getAllSports,
} from "../api/sportApi";
import useNotification from "../utils/useNotification";
import AddSportModal from "../component/Sport/AddSportModal";
import EditSportModal from "../component/Sport/EditSportModal";

const PaperWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CenterContent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const SportManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [sports, setSports] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

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
        field: "name",
        headerName: "Tên môn thể thao",
        headerAlign: "center",
        width: 300,
      },
      {
        field: "actions",
        headerName: "Hành động",
        renderCell: (params) => {
          const sport = params.row;
          return (
            <div style={{ display: "flex" }}>
              <IconView
                icon={EditIcon}
                onIconClick={handleEditIconClicked}
                data={sport}
              />
              <IconConfirm
                icon={DeleteIcon}
                titleConfirm="Xác nhận"
                contentConfirm={`Bạn muốn xóa môn thể thao ${sport.name}`}
                onAgreeClick={handleDeleteSport}
                data={sport.id}
              />
            </div>
          );
        },
      },
    ],
    [sports]
  );

  const closeAddModal = () => setOpenAddModal(false);
  const closeEditModal = () => setOpenEditModal(false);

  const handleAddClicked = async (name) => {
    try {
      const newSport = await addSport(name);

      let data = [...sports, newSport];
      data.sort((s1, s2) => s1.name.localeCompare(s2.name));
      setSports(data);

      notification("Thêm thành công!", "success");
    } catch (err) {
      notification("Có lỗi xảy ra, thêm thất bại!", "error");
      console.log({ err });
    }
  };

  const handleEditIconClicked = (sport) => {
    setOpenEditModal(true);
    setSelectedSport(sport);
  };

  const handleEditClicked = async (sport) => {
    try {
      const newSport = await editSport(sport);

      let sIndex = sports.findIndex((s) => s.id === sport.id);
      let data = [
        ...sports.slice(0, sIndex),
        newSport,
        ...sports.slice(sIndex + 1),
      ];
      setSports(data);

      notification("Cập nhật thành công!", "success");
    } catch (err) {
      notification("Có lỗi xảy ra, cập nhật thất bại!", "error");
      console.log({ err });
    }
  };

  const handleDeleteSport = async (sportId) => {
    try {
      await deleteSport(sportId);

      const data = sports.filter((s) => s.id !== sportId);
      setSports(data);

      notification("Xóa thành công!", "success");
    } catch (err) {
      notification("Có lỗi xảy ra, xóa thất bại!", "error");
      console.log({ err });
    }
  };

  const fetchSports = async () => {
    setLoading(true);
    try {
      let data = await getAllSports();
      setSports(data);
    } catch (err) {
      console.log({ err });
    }
    setLoading(false);
  };

  useEffect(fetchSports, []);

  return (
    <ContentLayout title="Quản lý môn thể thao">
      <PaperWrapper>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddModal(true)}
          >
            Thêm
          </Button>
        </Box>
        <Box sx={{ height: "24px" }} />
        {loading && (
          <CenterContent>
            <CircularProgress />
          </CenterContent>
        )}
        <DataGrid
          rows={sports}
          columns={columns}
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
        />
      </PaperWrapper>
      <AddSportModal
        open={openAddModal}
        onClose={closeAddModal}
        onAddClick={handleAddClicked}
      />
      <EditSportModal
        open={openEditModal}
        onClose={closeEditModal}
        onEditClick={handleEditClicked}
        sport={selectedSport}
      />
    </ContentLayout>
  );
};

export default SportManagementPage;
