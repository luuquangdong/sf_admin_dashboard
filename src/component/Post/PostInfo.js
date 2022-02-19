import { Avatar, Box, styled, Typography } from "@mui/material";
import React from "react";
import { formatTime } from "../../utils/dateUtils";

const Spacer = styled("div")(({ theme }) => ({ height: theme.spacing(1) }));

const PostInfo = ({ post }) => {
  return (
    <div>
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
          <img style={{ maxWidth: "100%" }} src={post.image.url} alt="ảnh" />
        )}
      </Box>
      <Spacer />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">Lượt thích: {post?.likeCount}</Typography>
        <Typography variant="body1">Bình luận: {post?.commentCount}</Typography>
      </Box>
    </div>
  );
};

export default PostInfo;
