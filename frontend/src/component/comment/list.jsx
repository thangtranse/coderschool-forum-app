// React
import React from "react";
// MUI
import CommentComponent from "./comment";

const CommentList = ({ comments = [] }) => {
  return comments.map((comment) => (
    <CommentComponent
      key={comment.id}
      commentId={comment.id}
      author={{
        email: comment.author.email,
        name: comment.author.name,
      }}
      content={comment.content}
      childComments={{
        count: comment.childComments.count,
      }}
      downVote={comment.downvotes.count}
      upVote={comment.upvotes.count}
      parentComment={comment.parentComment}
      postId={comment.post._id}
    />
  ));
};

export default CommentList;
