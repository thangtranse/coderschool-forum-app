// React
import React, { useEffect, useState } from "react";
// Material
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, TextField } from "@mui/material";
//
import FeedComponent from "../feed";

function PostFormComponent({ title = "", content = "", tag = [] }) {
  const [stateTitle, setTitle] = useState(title);
  const [stateTag, setTag] = useState(tag);
  const [markdown, setMarkdown] = useState(content);

  const [isReview, setReview] = useState(false);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if (stateTitle) {
      setIsChange(true);
    } else {
      setIsChange(false);
    }
  }, [markdown, stateTitle]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{ display: isReview ? "none" : "block" }}
        label="Tiêu đề"
        value={stateTitle}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        sx={{ display: isReview ? "none" : "block" }}
        label="Nội dung"
        multiline
        rows={4}
        variant="outlined"
        value={markdown}
        onChange={handleChange}
        fullWidth
      />
      <LoadingButton
        sx={{ display: isReview ? "none" : "block", marginTop: 1 }}
        variant="outlined"
        size="medium"
        color="primary"
        fullWidth={true}
        onClick={() => setReview(!isReview)}
        disabled={!isChange}
      >
        Xem trước bài đăng
      </LoadingButton>
      <FeedComponent
        sx={{ display: !isReview ? "none" : "block" }}
        title={stateTitle}
        markdown={markdown}
      />
      <Box
        sx={{
          flexDirection: "row",
          display: !isReview ? "none" : "flex",
        }}
      >
        <LoadingButton
          variant="outlined"
          size="medium"
          color="primary"
          fullWidth={true}
          sx={{
            marginTop: 1,
          }}
          onClick={() => setReview(!isReview)}
        >
          Thay đổi
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          size="medium"
          color="primary"
          fullWidth={true}
          sx={{
            marginTop: 1,
          }}
          onClick={() => setReview(!isReview)}
        >
          Đăng
        </LoadingButton>
      </Box>
    </form>
  );
}

export default PostFormComponent;
