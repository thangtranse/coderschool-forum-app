// React
import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// MUI
import Grid from "@mui/material/Grid";
// HOOK
// Component
import FeedComponent from "../component/feed";
// Import
import { GET_POST_BY_ID_QUERY } from "../apollo/query/post";

export default function FeedPage() {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  let { id } = useParams();

  const [getPost, { data, loading, error, fetchMore }] = useLazyQuery(
    GET_POST_BY_ID_QUERY,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );

  console.log(data)

  useEffect(() => {
    getPost({
      variables: {
        id: id,
      },
    });
  }, [id]);

  if (error || !data) {
    return (
      <Grid id={"feed"} container>
        <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item>Không tìm thấy bài đăng</Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
      </Grid>
    );
  }

  return (
    <Grid id={"feed"} container>
      <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item>
            <FeedComponent
              _id={data.post._id}
              author={{
                name: data.post?.author.email,
                ...data.post?.author
              }}
              title={data.post?.title}
              markdown={data.post?.content}
              tags={data.post?.tags}
              comments={data.post?.comments}
              upvote={data.post?.upvotes.count}
              downvote={data.post?.upvotes.count}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
    </Grid>
  );
}
