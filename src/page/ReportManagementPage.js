import { CircularProgress, Link, Paper, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { deleteReport, getAllReports } from "../api/reportApi";
import ContentLayout from "../component/layout/ContentLayout";
import useNotification from "../utils/useNotification";
import { formatDate } from "../utils/dateUtils";
import IconView from "../component/IconView";
import IconConfirm from "../component/IconConfirm";
import ModalDetailReport from "../component/ModalDetailReport";

const PaperWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CenterContent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const ReportManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const [selectedReport, setSelectedReport] = useState(null);
  const [openReportModal, setOpenReportModal] = useState(false);

  const notification = useNotification();

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        headerAlign: "center",
        align: "center",
        width: 190,
      },
      {
        field: "postId",
        headerName: "Id Bài viết",
        headerAlign: "center",
        align: "center",
        width: 190,
        renderCell: (params) => (
          <Link to={`/posts/${params.row.postId}`} component={RouterLink}>
            {params.value}
          </Link>
        ),
      },
      {
        field: "userId",
        headerName: "Id Người báo cáo",
        headerAlign: "center",
        align: "center",
        width: 140,
      },
      {
        field: "createdTime",
        headerName: "Ngày báo cáo",
        headerAlign: "center",
        width: 120,
        align: "center",
        renderCell: (params) => <div>{formatDate(params.value)}</div>,
      },
      {
        field: "reason",
        headerName: "Lý do",
        headerAlign: "center",
        width: 200,
        flex: 1,
      },
      {
        field: "actions",
        headerName: "Hành động",
        flex: 1,
        renderCell: (params) => {
          const report = params.row;
          return (
            <div style={{ display: "flex" }}>
              <IconView
                icon={VisibilityIcon}
                onIconClick={handleViewClicked}
                data={report}
              />
              <IconConfirm
                icon={DeleteIcon}
                titleConfirm="Xác nhận"
                contentConfirm={`Bạn muốn xóa báo cáo có Id: ${report.id}`}
                onAgreeClick={handleDeleteReport}
                data={report.id}
              />
            </div>
          );
        },
      },
    ],
    [reports]
  );

  const closeReportModal = () => setOpenReportModal(false);

  const handleViewClicked = (report) => {
    setSelectedReport(report);
    setOpenReportModal(true);
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await deleteReport(reportId);

      const data = reports.filter((r) => r.id !== reportId);
      setReports(data);

      notification("Xóa thành công!", "success");
    } catch (err) {
      notification("Có lỗi xảy ra, xóa thất bại!", "error");
      console.log({ err });
    }
  };

  const fetchReport = async () => {
    setLoading(true);
    try {
      const data = await getAllReports();
      console.log(data);
      setReports(data);
    } catch (err) {
      console.log({ err });
    }
    setLoading(false);
  };

  useEffect(fetchReport, []);

  return (
    <ContentLayout title="Quản lý phản hồi">
      <PaperWrapper>
        {loading && (
          <CenterContent>
            <CircularProgress />
          </CenterContent>
        )}
        <DataGrid
          rows={reports}
          columns={columns}
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
        />
      </PaperWrapper>
      <ModalDetailReport
        open={openReportModal}
        onClose={closeReportModal}
        report={selectedReport}
        onDeleteReportClick={handleDeleteReport}
      />
    </ContentLayout>
  );
};

export default ReportManagementPage;
