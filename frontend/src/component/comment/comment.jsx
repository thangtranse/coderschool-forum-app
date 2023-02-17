// React
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// MUI
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Typography } from "@mui/material";
// Import
import { COMMENT_QUERY } from "../../apollo/query/comment";
import AvatarComponent from "../avatar";
import VoteComponent from "../vote";
import Comments from "./list";
import ReplyComponent from "./reply";

const Comment = ({
  commentId,
  author: { email = "", name = "" },
  content,
  childComments: { count },
  upVote = 0,
  downVote = 0,
  parentComment = null,
  postId = "",
}) => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const [child, setChild] = useState([]);

  const [loadComment, { data, loading, error, fetchMore }] = useLazyQuery(
    COMMENT_QUERY,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const handleLoadMore = () => {
    loadComment({
      variables: {
        commentId: commentId,
      },
    });
  };

  useEffect(() => {
    if (
      data &&
      data.comment &&
      data.comment.childComments &&
      data.comment.childComments.comments
    ) {
      setChild(data.comment.childComments.comments);
    }
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "baseline",
        gap: "10px",
        margin: "6px 0",
        width: "100%",
      }}
    >
      <AvatarComponent author={{ email, name }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "baseline",
          width: "inherit",
        }}
      >
        <Typography sx={{ cursor: "pointer" }} variant="subtitle2" gutterBottom>
          {name || email}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {content}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            alignItems: "stretch !important",
          }}
        >
          <VoteComponent
            _id={commentId}
            up={upVote}
            down={downVote}
            type={"comment"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "inherit",
            cursor: "pointer",
            width: "inherit",
            justifyContent: "space-between",
            flexWrap: "wrap",
            "& .MuiTextField-root": { m: 1, width: "30ch" },
            "& p": {
              marginBottom: 0,
            },
          }}
        >
          <ReplyComponent
            commentId={commentId}
            author={{ email, name }}
            childComments={count}
            parentComment={parentComment}
            postId={postId}
            onLoadComment={loadComment}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              cursor: "pointer",
              "& .MuiTextField-root": { m: 1, width: "30ch" },
              "& p": {
                marginBottom: 0,
              },
            }}
          >
            {count > 0 && count - child > 0 ? (
              <>
                <Typography
                  onClick={handleLoadMore}
                  variant="body2"
                  gutterBottom
                >{`Xem thêm ${count - child} bình luận`}</Typography>
                <KeyboardArrowDownIcon onClick={handleLoadMore} />
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
        <Comments comments={child} />
      </Box>
    </Box>
  );
};

export default Comment;
