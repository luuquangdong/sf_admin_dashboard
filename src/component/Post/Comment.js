import {
  CircularProgress,
  Pagination,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { getComments } from "../../api/postApi";
import CommentItem from "./CommentItem";

const CenterContent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const PAGE_SIZE = 2;

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#FFF",
  boxShadow: 24,
  padding: theme.spacing(1),
}));

const Comment = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const count = useMemo(() => {
    if (!post) return 1;
    return Math.ceil(post.commentCount / PAGE_SIZE);
  }, [post]);

  const handlePageChange = (event, value) => setPage(value);

  const fetchComment = async () => {
    if (!post) return;
    try {
      setLoading(true);
      const data = await getComments(post.id, page, PAGE_SIZE);
      setComments(data);
      console.log(data);
    } catch (err) {
      console.log({ err });
    }
    setLoading(false);
  };

  useEffect(fetchComment, [page, post]);

  return (
    <div>
      <Typography variant="h6" component="div">
        Bình luận của bài viết
      </Typography>
      <Container>
        {loading && (
          <CenterContent>
            <CircularProgress />
          </CenterContent>
        )}
        {comments.length === 0 && (
          <Typography>Bài viết chưa có bình luận nào</Typography>
        )}
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
        <Stack spacing={2}>
          <Pagination
            variant="outlined"
            color="primary"
            count={count}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default Comment;
