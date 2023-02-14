// React
import React from "react";
// MUI
import { Box, Typography, Link } from "@mui/material";
import Comments from "./list";
import ReplyComponent from "./reply";

const CommentList = ({ postId, comments, total, author: { email, name } }) => {
  return (
    <Box sx={{ borderTop: "1px solid #333", paddingTop: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <ReplyComponent
            commentId={null}
            author={{ email, name }}
            childComments={total}
            parentComment={null}
            postId={postId}
            onLoadComment={() => {}}
          />
        </Box>
        <Typography
          sx={{ cursor: "pointer" }}
          variant="overline"
          display="block"
          gutterBottom
        >
          <Link href={`/news/${postId}`} underline="none">
            {comments.length < total
              ? `Xem tất cả ${total - comments.length} bình luận còn lại`
              : ""}
          </Link>
        </Typography>
      </Box>
      <Comments comments={comments} />
    </Box>
  );
};

export default CommentList;
