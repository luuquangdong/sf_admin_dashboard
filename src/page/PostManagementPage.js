import { Paper, styled, CircularProgress, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { banPost, getAllPosts } from "../api/postApi";
import ContentLayout from "../component/layout/ContentLayout";
import { formatDate } from "../utils/dateUtils";
import IconConfirm from "../component/IconConfirm";
import useNotification from "../utils/useNotification";

const PaperWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CenterContent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const PostManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const notification = useNotification();
  const navigate = useNavigate();

  const handleViewClicked = (post) => {
    navigate(`/posts/${post.id}`);
  };

  const handleAgreeBanClicked = async (post) => {
    try {
      const p = await banPost(post.id, !post.banned);

      const pIndex = posts.findIndex((pi) => pi.id === post.id);
      const data = [...posts.slice(0, pIndex), p, ...posts.slice(pIndex + 1)];
      setPosts(data);

      notification("Thao tác thành công", "success");
    } catch (err) {
      console.log(err);
      notification("Có lỗi xảy ra, thao tác thất bại", "error");
    }
  };

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        headerAlign: "center",
        align: "center",
        width: 200,
        renderCell: (params) => (
          <Link to={`/posts/${params.value}`} component={RouterLink}>
            {params.value}
          </Link>
        ),
      },
      {
        field: "authorId",
        headerName: "Id tác giả",
        headerAlign: "center",
        align: "center",
        width: 120,
      },
      {
        field: "commentCount",
        headerName: "Số bình luận",
        headerAlign: "center",
        align: "center",
        width: 120,
      },
      {
        field: "likeCount",
        headerName: "Lượt thích",
        headerAlign: "center",
        align: "center",
        width: 100,
      },
      {
        field: "content",
        headerName: "Nội dung",
        headerAlign: "center",
        width: 150,
        flex: 1,
      },
      {
        field: "createdTime",
        headerName: "Ngày đăng",
        headerAlign: "center",
        width: 120,
        align: "center",
        renderCell: (params) => <div>{formatDate(params.value)}</div>,
      },
      {
        field: "actions",
        headerName: "Hành động",
        flex: 1,
        renderCell: (params) => {
          const post = params.row;
          return (
            <div style={{ display: "flex" }}>
              {/* <IconView
                icon={VisibilityIcon}
                onIconClick={handleViewClicked}
                data={post}
              /> */}
              <IconConfirm
                icon={post.banned ? LockOpenOutlinedIcon : LockRoundedIcon}
                titleConfirm="Xác nhận"
                contentConfirm={`Bạn muốn
                  ${post.banned ? " mở " : " "}
                  khóa bài viết có Id: ${post.id}`}
                onAgreeClick={handleAgreeBanClicked}
                data={post}
              />
            </div>
          );
        },
      },
    ],
    [posts]
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = await getAllPosts();
      data = data.map((p) => ({ ...p, likeCount: p.userLikedId.length }));

      setPosts(data);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(fetchData, []);

  return (
    <ContentLayout title="Quản lý bài viết">
      <PaperWrapper>
        {loading && (
          <CenterContent>
            <CircularProgress />
          </CenterContent>
        )}
        <DataGrid
          rows={posts}
          columns={columns}
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

export default PostManagementPage;
