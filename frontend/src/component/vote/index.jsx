// React
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// MUI
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Typography } from "@mui/material";

import { DOWNVOTE_POST, UPVOTE_POST } from "../../apollo/query/post";
import { DOWNVOTE_COMMENT, UPVOTE_COMMENT } from "../../apollo/query/vote";

const VoteComponent = ({ _id, up, down, type }) => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const [stateUp, setUp] = useState(up);
  const [stateDown, setDown] = useState(down);

  const [UpvotePost, { loading: upvoteLoading }] = useMutation(UPVOTE_POST, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const [DownvotePost, { loading: downvoteLoading }] = useMutation(
    DOWNVOTE_POST,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const [UpvoteComment, { loading: upvoteCommentLoading }] = useMutation(
    UPVOTE_COMMENT,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const [DownvoteComment, { loading: downvoteCommentLoading }] = useMutation(
    DOWNVOTE_COMMENT,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  const handleUpvote = async () => {
    if (_id) {
      try {
        let numUp = up;
        let numDown = down;
        if (type === "post") {
          const resultUpPost = await UpvotePost({
            variables: { id: _id },
          });
          numUp = resultUpPost.data.upvotePost.upvotes.count;
          numDown = resultUpPost.data.upvotePost.downvotes.count;
        }
        if (type === "comment") {
          const resultUpComment = await UpvoteComment({
            variables: { id: _id },
          });
          numUp = resultUpComment.data.upvoteComment.upvotes.count;
          numDown = resultUpComment.data.upvoteComment.downvotes.count;
        }
        setUp(numUp);
        setDown(numDown);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDownvote = async () => {
    if (_id) {
      try {
        let numUp = up;
        let numDown = down;
        if (type === "post") {
          const resultDownPost = await DownvotePost({
            variables: { id: _id },
          });
          numUp = resultDownPost.data.downvotePost.upvotes.count;
          numDown = resultDownPost.data.downvotePost.downvotes.count;
        }
        if (type === "comment") {
          const resultDownPost = await DownvoteComment({
            variables: { id: _id },
          });
          numUp = resultDownPost.data.downvoteComment.upvotes.count;
          numDown = resultDownPost.data.downvoteComment.downvotes.count;
        }
        setUp(numUp);
        setDown(numDown);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ThumbUpOffAltIcon sx={{ cursor: "pointer" }} onClick={handleUpvote} />{" "}
      <Typography
        sx={{ cursor: "pointer" }}
        variant="overline"
        display="block"
        gutterBottom
      >
        {stateUp}
      </Typography>
      {`|`}
      <ThumbDownOffAltIcon
        sx={{ cursor: "pointer" }}
        onClick={handleDownvote}
      />
      <Typography
        sx={{ cursor: "pointer" }}
        variant="overline"
        display="block"
        gutterBottom
      >
        {stateDown}
      </Typography>
    </>
  );
};

export default VoteComponent;
