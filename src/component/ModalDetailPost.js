import { Avatar, Box, Button, Modal, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getPost } from "../api/postApi";
import { formatTime } from "../utils/dateUtils";

const Container = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "#FFF",
  boxShadow: 24,
  padding: theme.spacing(2),
  overflow: "scroll",
}));

const Spacer = styled("div")(({ theme }) => ({ height: theme.spacing(1) }));

const ModalDetailPost = ({ postId, open, onClose }) => {
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    if (!postId) return;
    try {
      const post = await getPost(postId);
      setPost(post);
      console.log(post);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(fetchPost, [postId]);

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
            Chi tiết bài viết
          </Typography>
          <Button>khóa bài viết</Button>
        </Box>
        <Box>
          <Typography component="div">
            Trạng thái: {post && post.banned ? "Đã khóa" : "Hiển thị"}
          </Typography>
          <Typography component="div">Id tác giả: {post?.authorId}</Typography>
        </Box>
        <Spacer />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 1 }}>
            <Avatar
              alt={post?.author?.name ?? "x"}
              src={post?.author?.avatar?.url}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" component="div">
              {post?.author?.name}
            </Typography>
            <Typography variant="caption" display="block">
              {formatTime(post?.createdTime)}
            </Typography>
          </Box>
        </Box>
        <Spacer />
        <Box>
          <Typography variant="body1">{post?.content}</Typography>
          {post?.image && (
            <img width={560} height="auto" src={post.image.url} alt="ảnh" />
          )}
        </Box>
        <Spacer />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Lượt thích: {post?.likeCount}</Typography>
          <Typography variant="body1">
            Bình luận: {post?.commentCount}
          </Typography>
        </Box>
      </Container>
    </Modal>
  );
};

export default ModalDetailPost;
