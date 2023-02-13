// React
import React, { memo } from "react";
// MUI
import { Box } from "@mui/material";
//
import { marked } from "marked";

function FeedComponent({ title, markdown, ...props }) {
  const getMarkdownText = () => {
    return { __html: marked.parse(markdown) };
  };
  return (
    <Box {...props}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={getMarkdownText()} />
    </Box>
  );
}

export default memo(FeedComponent);
