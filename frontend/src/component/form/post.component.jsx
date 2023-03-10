// React
import React, { useEffect, useState } from "react";
// Material
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";
import FeedComponent from "../feed";
import InputPostComponent from "./input.post";
import { REGEX_HASHTAG } from "../../util/regexHashtag";

function PostFormComponent({
  title = "",
  content = ``,
  tags = [],
  onSubmitDataCreate,
}) {
  const [stateTitle, setTitle] = useState(title);
  const [markdown, setMarkdown] = useState(content);  
  const [review, setReview] = useState({ title, content, tags });
  const [isReview, setIsReview] = useState(false);
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
    onSubmitDataCreate(review);
  };

  const handleReview = (event) => {
    event.preventDefault();
    setIsReview(!isReview);
    const hashtagRegex = REGEX_HASHTAG;
    const hashtags = markdown.match(hashtagRegex);
    const tagsWithoutHash = hashtags && hashtags.map((tag) => tag.replace("#", ""));
    setReview({
      title: stateTitle,
      content: markdown,
      tags: tagsWithoutHash || [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputPostComponent
        title={stateTitle}
        content={markdown}
        isReview={isReview}
        option={{
          onSetTitle: setTitle,
          onSetContent: setMarkdown,
          onSetIsChange: setIsChange,
          onSetIsReview: setIsReview,
        }}
      />
      <LoadingButton
        sx={{ display: isReview ? "none" : "block", marginTop: 1 }}
        variant="outlined"
        size="medium"
        color="primary"
        fullWidth={true}
        onClick={handleReview}
        disabled={!isChange}
      >
        Xem trước bài đăng
      </LoadingButton>
      <FeedComponent
        sx={{ display: !isReview ? "none" : "block" }}
        title={review.title}
        markdown={review.content}
        tags={review.tags}
        isReview={true}
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
          onClick={() => setIsReview(!isReview)}
        >
          Thay đổi
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          size="medium"
          color="primary"
          type="submit"
          fullWidth={true}
          sx={{
            marginTop: 1,
          }}
          onClick={() => {
            setIsReview(!isReview);
          }}
        >
          Đăng
        </LoadingButton>
      </Box>
    </form>
  );
}

export default PostFormComponent;