const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Comment {
    id: ID!
    author: Account!
    content: String!
    post: Post!
    parentComment: Comment
    childComments: ChildComment
    upvotes: Upvote!
    downvotes: Downvote!
    createdAt: String!
    updatedAt: String!
  }

  type ChildComment {
    comments: [Comment]
    count: Int!
  }

  type Downvote {
    users: [Account]
    count: Int!
  }

  type Upvote {
    users: [Account]
    count: Int!
  }

  input CreateCommentInput {
    content: String!
    postId: ID!
    parentComment: ID
    childComments: [ID]
  }

  input UpdateCommentInput {
    id: ID!
    content: String
  }

  type Query {
    comment(id: ID!): Comment
    comments(postId: ID, limit: Int): [Comment]
  }

  type VotePayload {
    status: Boolean
    upvotes: Upvote
    downvotes: Downvote
  }

  type Mutation {
    addComment(input: CreateCommentInput!): Comment
    updateComment(input: UpdateCommentInput!): Comment
    deleteComment(id: ID!): Comment
    upvoteComment(id: ID!): VotePayload
    downvoteComment(id: ID!): VotePayload
  }
`;

module.exports = typeDefs;
