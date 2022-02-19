import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { banPost, getPost } from "../api/postApi";
import ContentLayout from "../component/layout/ContentLayout";
import Comment from "../component/Post/Comment";
import PostInfo from "../component/Post/PostInfo";
import useNotification from "../utils/useNotification";
import MyDialog from "../component/MyDialog";
import PrePage from "../component/PrePage";
import LayoutWithPrePage from "../component/layout/LayoutWithPrePage";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#FFF",
  boxShadow: 24,
  padding: theme.spacing(2),
}));

const Spacer = styled("div")(({ theme }) => ({ height: theme.spacing(1) }));

const DetailPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const [openConfirmBanPost, setOpenConfirmBanPost] = useState(false);

  const closeConfirmBanPost = () => setOpenConfirmBanPost(false);

  const notification = useNotification();

  const handleBanClicked = () => setOpenConfirmBanPost(true);

  const handleBanPost = async () => {
    closeConfirmBanPost();
    if (!post) return;

    try {
      const p = await banPost(post.id, !post.banned);
      setPost({ ...post, banned: p.banned, countComment: p.countComment });

      notification("Thao tác thành công", "success");
    } catch (err) {
      console.log(err);
      notification("Có lỗi xảy ra, thao tác thất bại", "error");
    }
  };

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
    <LayoutWithPrePage title={"Chi tiết bài viết"}>
      <Grid
        container
        spacing={2}
        sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
      >
        <Grid item xs={12} md={6}>
          <Container>
            <PostInfo post={post} />
          </Container>
          <Divider />
          <Comment post={post} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* <Typography variant="h5" component="div"></Typography> */}
              <Button onClick={handleBanClicked}>
                {post && post.banned ? "Mở khóa bài viết" : "Khóa bài viết"}
              </Button>
            </Box>
            <Box>
              <Typography component="div">
                Trạng thái: {post && post.banned ? "Đã khóa" : "Hiển thị"}
              </Typography>
              <Typography component="div">
                Id tác giả: {post?.authorId}
              </Typography>
              <Typography component="div">
                {post && post.canComment
                  ? "Có thể bình luận"
                  : "Khóa bình luận"}
              </Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
      <MyDialog
        open={openConfirmBanPost}
        onClose={closeConfirmBanPost}
        title={"Xác nhận"}
        content={
          post?.banned
            ? "Bạn có muốn mở khóa bài viết?"
            : "Bạn có muốn khóa bài viết?"
        }
        onAgreeClick={handleBanPost}
      />
    </LayoutWithPrePage>
  );
};

export default DetailPostPage;
