import { Box, Button, Modal, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getUser } from "../api/userApi";
import { formatDate } from "../utils/dateUtils";

const Container = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#FFF",
  boxShadow: 24,
  padding: theme.spacing(2),
  // overflow: "scroll",
}));

const Title = styled("div")({
  width: 160,
  color: "#888",
  fontSize: "0.9rem",
  textTransform: "uppercase",
});

const ModalDetailSignupOrg = ({
  signupOrg,
  open,
  onClose,
  onAgreeClick,
  onRejectClick,
}) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    if (!signupOrg || !open) return;
    try {
      const u = await getUser(signupOrg.userId);
      setUser(u);
    } catch (err) {
      console.log({ err });
    }
  };

  const handleAgreeClick = () => {
    if (onAgreeClick) onAgreeClick(signupOrg);
    onClose();
  };

  const handleRejectClick = () => {
    if (onRejectClick) onRejectClick(signupOrg);
    onClose();
  };

  useEffect(fetchUser, [signupOrg]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-detail-post"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="div">
            Chi tiết đăng ký
          </Typography>
          {/* <Button>khóa bài viết</Button> */}
        </Box>
        <Box sx={{ m: 1 }} />
        <Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Id:</Title>
            <Typography>{signupOrg?.id}</Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Id người đăng ký:</Title>
            <Typography>{signupOrg?.userId}</Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Họ tên: </Title>
            <Typography>{user?.name}</Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Title>Ngày sinh: </Title>
            <Typography>{formatDate(user?.birthday)}</Typography>
          </Box>
          <Box>
            <img
              style={{ maxWidth: "100%" }}
              src={signupOrg?.idCard?.url}
              alt="ảnh"
            />
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
          <Button variant="outlined" onClick={handleAgreeClick}>
            Đồng ý
          </Button>
          <Box sx={{ width: 8 }} />
          <Button variant="outlined" onClick={handleRejectClick}>
            Từ chối
          </Button>
          <Box sx={{ width: 8 }} />
          <Button variant="outlined" onClick={onClose}>
            Đóng
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default ModalDetailSignupOrg;
