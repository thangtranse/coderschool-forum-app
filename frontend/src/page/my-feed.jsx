// React
import { useMutation } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
// MUI
import Grid from "@mui/material/Grid";
// HOOK
// Component
import LoadMoreComponent from "../component/dataLoad";
import PostForm from "../component/form/post.component";
// Import
import { CREATE_POST_MUTATION, GET_POSTS_QUERY } from "../apollo/query/post";

export default function MyFeedPage() {

  const accessToken = useSelector((state) => state.authentication.accessToken);
  const [CreatePost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const handleCreateNews = async ({ title, content, tags }) => {
    try {
      const { data } = await CreatePost({
        variables: { input: { title, content, tags } },
      });
      if (data) {
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Grid id={"my-feed"} container>
      <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          gap={1}
        >
          <Grid item>
            <PostForm isLoading={null} onSubmitDataCreate={handleCreateNews} />
          </Grid>
          <Grid item>
            <LoadMoreComponent GET_POSTS_QUERY={GET_POSTS_QUERY} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
    </Grid>
  );
}
