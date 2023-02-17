// React
import { marked } from "marked";
import React, { memo } from "react";
import { Link as RouterLink } from "react-router-dom";
// MUI
import { Box, Link, Typography } from "@mui/material";
import CommentList from "../comment";
import VoteComponent from "../vote";
// Component
import AvatarComponent from "../avatar";

function FeedComponent({
  _id,
  isReview,
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
    const htmlSource = marked.parse(markdown);
    const html = htmlSource.replace(
      /(#\w+)/g,
      `<a href='/hashtag/$1' style='cursor: pointer; color: #1875d2ba; text-decoration: none'}>$1</a>`
    );
    return { __html: html };
  };

  return (
    <Box
      {...props}
      sx={{
        margin: "5px 0",
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
      <Link
        component={RouterLink}
        to={`/news/${_id}`}
        underline="none"
        sx={{ color: "initial" }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </Link>
      <Typography
        variant="body1"
        gutterBottom
        dangerouslySetInnerHTML={getMarkdownText()}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          marginBottom: "5px",
          alignItems: "stretch !important",
          justifyContent: "flex-start",
        }}
      >
        {tags.map((x, i) => {
          return (
            <Box
              key={x + "" + i}
              sx={{ cursor: "pointer", color: "#1875d2ba" }}
            >{`#${x} `}</Box>
          );
        })}
      </Box>
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
      <Box sx={{ display: isReview ? "none" : "block" }}>
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
