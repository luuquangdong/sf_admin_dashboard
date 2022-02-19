import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { formatTime } from "../../utils/dateUtils";

const CommentItem = ({ comment }) => {
  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: 1,
        borderBottomColor: "#CCC",
      }}
    >
      <Box sx={{ my: 1, mr: 1 }}>
        <Avatar
          sx={{ width: 36, height: 36 }}
          alt={comment.author.name}
          src={comment.author.avatar?.url}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="div">
          {comment?.author?.name}
        </Typography>
        <Typography variant="caption" display="block">
          {formatTime(comment.createdTime)}
        </Typography>
        <Typography variant="body1">{comment?.content}</Typography>
      </Box>
    </Box>
  );
};

export default CommentItem;
