// React
import { marked } from "marked";
import React, { memo } from "react";
// MUI
import { Box, Typography } from "@mui/material";
import CommentList from "../comment";
import VoteComponent from "../vote";
// Component
import AvatarComponent from "../avatar";

function FeedComponent({
  _id,
  author = { name: "Trần Minh Thắng" },
  title = "",
  markdown = "",
  tags = [],
  comments = { count: 0, comments: [] },
  upvote = 0,
  downvote = 0,
  ...props
}) {

  const getMarkdownText = () => {
    return { __html: marked.parse(markdown) };
  };

  return (
    <Box
      {...props}
      sx={{
        padding: "10px",
        border: "1px solid",
        ...props.sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          alignItems: "baseline",
        }}
      >
        <AvatarComponent author={{ email: author.email, name: author.name }} />
        <Typography
          sx={{ cursor: "pointer" }}
          display="block"
          variant="h6"
          gutterBottom
        >
          {author && author.name ? author.name : ""}
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        dangerouslySetInnerHTML={getMarkdownText()}
      />
      {tags.map((x) => {
        return `#${x}`;
      })}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          alignItems: "stretch !important",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            alignItems: "stretch !important",
          }}
        >
          <VoteComponent _id={_id} up={upvote} down={downvote} type={"post"} />
        </Box>
        <Typography
          sx={{ cursor: "pointer" }}
          variant="overline"
          display="block"
          gutterBottom
        >{`${comments.count} commennt${
          comments.count > 0 ? "s" : ""
        }`}</Typography>
      </Box>
      <Box>
        <CommentList
          author={{ email: author.email, name: author.name }}
          postId={_id}
          comments={comments.comments}
          total={comments.count}
        />
      </Box>
    </Box>
  );
}

export default memo(FeedComponent);
