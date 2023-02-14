// React
import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// MUI
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, TextField, Typography } from "@mui/material";
// Import
import { useEffect } from "react";
import { COMMENT_QUERY } from "../../apollo/query/comment";
import AvatarComponent from "../avatar";
import Comments from "./list";
import VoteComponent from "../vote";

const Comment = ({
  commentId,
  author: { email = "", name = "" },
  content,
  childComments: { count },
  upVote = 0,
  downVote = 0,
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
      }}
    >
      <AvatarComponent author={{ email, name }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "baseline",
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
            alignItems: "flex-end",
            cursor: "pointer",
            "& .MuiTextField-root": { m: 1, width: "30ch" },
            "& p": {
              marginBottom: 0,
            },
          }}
        >
          <Typography
            variant="overline"
            display="block"
            gutterBottom
          >{`Trả lời`}</Typography>
          <Box
            sx={{
              display: "none",
              alignItems: "flex-end",
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
          >
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-commennt-sx"
              label={`${name || email} trả lời bình luận`}
              variant="standard"
            />
          </Box>
        </Box>
        <Comments comments={child} />
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
    </Box>
  );
};

export default Comment;