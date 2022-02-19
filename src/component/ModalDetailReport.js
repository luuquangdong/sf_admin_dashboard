import { Box, Button, Link, Modal, styled, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

import { formatTime } from "../utils/dateUtils";

const Container = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  backgroundColor: "#FFF",
  boxShadow: 24,
  padding: theme.spacing(2),
}));

const Title = styled("div")({
  width: 160,
  color: "#888",
  fontSize: "0.9rem",
  textTransform: "uppercase",
});

const ModalDetailReport = ({ open, onClose, report, onDeleteReportClick }) => {
  const handleDeleteReportClicked = () => {
    if (onDeleteReportClick) {
      if (window.confirm("Bạn có chắc muốn xóa phản hồi này không?")) {
        onDeleteReportClick(report.id);
        onClose();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-add-sport"
      aria-describedby="modal-add-description"
    >
      <Container>
        <Box>
          <Typography variant="h4" component="div">
            Chi tiết phản hồi
          </Typography>
        </Box>
        <Box sx={{ m: 1 }} />
        <Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Id:</Title>
            <Typography>{report?.id}</Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Id Bài viết:</Title>
            <Link to={`/posts/${report?.postId}`} component={RouterLink}>
              {report?.postId}
            </Link>
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Id người phản hồi:</Title>
            <Typography>{report?.userId}</Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Thời gian phản hồi:</Title>
            <Typography>{formatTime(report?.createdTime)}</Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Lý do:</Title>
            <Typography>{report?.reason}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Đóng
          </Button>
          <Box sx={{ width: 8 }} />
          <Button variant="outlined" onClick={handleDeleteReportClicked}>
            Xóa phản hồi
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default ModalDetailReport;
