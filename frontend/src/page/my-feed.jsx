import React from "react";
// MUI
import Grid from "@mui/material/Grid";
// Import
import PostForm from "../component/form/post.component";

export default function MyFeedPage() {
  return (
    <Grid id={"my-feed"} container>
      <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item>
            <PostForm />
          </Grid>
          <Grid item>
            <div>My Feed Page</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
    </Grid>
  );
}
