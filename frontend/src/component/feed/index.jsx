// React
import { marked } from "marked";
import React, { memo } from "react";
// MUI
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Avatar, Box, Typography } from "@mui/material";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${
      name.indexOf(" ") !== -1
        ? name.split(" ")[0][0] + " " + name.split(" ")[1][0]
        : name
    }`,
  };
}

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function FeedComponent({
  author = { name: "Trần Minh Thắng" },
  title = "",
  markdown = "",
  tags = [],
  comment = [{ content: "a" }],
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
        <Avatar {...stringAvatar(author && author.name ? author.name : "")} />
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
        }}
      >
        <ThumbUpOffAltIcon sx={{ cursor: "pointer" }} />{" "}
        <Typography
          sx={{ cursor: "pointer" }}
          variant="overline"
          display="block"
          gutterBottom
        >
          {upvote}
        </Typography>
        {`|`}
        <ThumbDownOffAltIcon sx={{ cursor: "pointer" }} />
        <Typography
          sx={{ cursor: "pointer" }}
          variant="overline"
          display="block"
          gutterBottom
        >
          {downvote}
        </Typography>
      </Box>
    </Box>
  );
}

export default memo(FeedComponent);
