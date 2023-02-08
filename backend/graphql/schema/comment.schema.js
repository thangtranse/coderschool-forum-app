const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Comment {
    id: ID!
    text: String!
    author: Account!
    createdAt: String!
    upvotes: Int!
    downvotes: Int!
    post: Post!
    replies: [Comment]
  }

  input CommentInput {
    text: String!
    postId: ID!
  }

  type Query {
    comment(id: ID!): Comment
    comments(postId: ID!): [Comment]
  }

  type Mutation {
    createComment(input: CommentInput!): Comment
    updateComment(id: ID!, text: String!): Comment
    deleteComment(id: ID!): Comment
    upvoteComment(id: ID!): Comment
    downvoteComment(id: ID!): Comment
  }
`;

module.exports = typeDefs;
