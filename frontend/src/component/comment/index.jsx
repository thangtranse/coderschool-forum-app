// React
import React from "react";
// MUI
import { Box, Typography } from "@mui/material";
import Comments from "./list";

const CommentList = ({ comments, total }) => {
  return (
    <Box sx={{ borderTop: "1px solid #333", paddingTop: 1 }}>
      <Typography
        sx={{ cursor: "pointer" }}
        variant="overline"
        display="block"
        gutterBottom
      >
        {comments.length < total
          ? `Xem tất cả ${total - comments.length} bình luận còn lại`
          : ""}
      </Typography>
      <Comments comments={comments} />
    </Box>
  );
};

export default CommentList;
