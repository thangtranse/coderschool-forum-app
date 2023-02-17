// React
import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
// MUI
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, TextField, Typography } from "@mui/material";
// Import
import { ADD_COMMENT_MUTATION } from "../../apollo/query/comment";

const ReplyComponent = ({
  commentId,
  author: { email = "", name = "" },
  childComments: { count },
  parentComment = null,
  postId = "",
  onLoadComment,
}) => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const [reply, setReply] = useState(false);
  const inputRefComment = useRef(null);

  const [AddComment, { loading: loadingCommentAdd }] = useMutation(
    ADD_COMMENT_MUTATION,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const handlePushComment = async (e) => {
    try {
      if (!e.shiftKey && e.code === "Enter") {
        const resultPushComment = await AddComment({
          variables: {
            input: {
              content: inputRefComment.current.value,
              postId: postId,
              parentComment: commentId,
            },
          },
        });
        inputRefComment.current.value = "";
        setReply(false);
        onLoadComment({
          variables: {
            commentId: resultPushComment.data.addComment.parentComment.id,
          },
        });
      }
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        onClick={() => setReply(!reply)}
      >{`${reply ? "Huỷ bỏ" : "Trả lời"}`}</Typography>
      <Box
        sx={{
          display: `${reply ? "flex" : "none"}`,
          alignItems: "flex-end",
          "& .MuiSvgIcon-root": {
            marginBottom: 0,
            marginRight: "4px",
            marginTop: 0,
          },
          "& .MuiTextField-root": { m: 0, width: "30ch" },
          "& .MuiInputBase-root": { m: 0 },
          "& .MuiFormLabel-root": { fontSize: "0.8rem", top: -10 },
        }}
      >
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-commennt-sx"
          label={`${name || email} trả lời bình luận`}
          variant="standard"
          sx={{ margin: "0px !important" }}
          inputRef={inputRefComment}
          onKeyDown={handlePushComment}
        />
      </Box>
    </Box>
  );
};

export default ReplyComponent;
