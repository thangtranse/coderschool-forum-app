// React
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// MUI
// Import
import FeedComponent from "../feed";
// Custom Hook
import useElementOnScreen from "../../hook/useIsVisible";

const LoadDataComponent = ({ GET_POSTS_QUERY }) => {
  const accessToken = useSelector((state) => state.authentication.accessToken);

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const { data, loading, error, fetchMore } = useQuery(GET_POSTS_QUERY, {
    variables: {
      limit: 3,
      hasNextPage: null,
    },
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  useEffect(() => {
    if (isVisible) {
      if (data.posts.pageInfo.hasNextPage) {
        fetchMore({
          variables: {
            limit: 3,
            hasNextPage: data.posts.pageInfo.hasNextPage,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              posts: {
                data: [...prev.posts.data, ...fetchMoreResult.posts.data],
                pageInfo: { ...fetchMoreResult.posts.pageInfo },
              },
            });
          },
        });
      }
    }
  }, [isVisible]);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      {data.posts.data.map((item, index) => {
        return (
          <>
            <FeedComponent
              key={item._id}
              _id={item._id}
              title={item.title}
              author={{ name: item.author.email }}
              markdown={item.content}
              upvote={item.upvotes.count}
              downvote={item.downvotes.count}
              comments={item.comments}
              tags={item.tags}
            />
          </>
        );
      })}
      <div
        style={{
          position: "relative",
          bottom: "20vh",
          visibility: "hidden",
        }}
        ref={containerRef}
      >
        {" "}
      </div>
    </>
  );
};

export default LoadDataComponent;
