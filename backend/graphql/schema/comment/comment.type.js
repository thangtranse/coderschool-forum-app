const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Comment {
    id: ID!
    author: Account!
    content: String!
    post: Post!
    parentComment: Comment
    childComments: [Comment]
    upvotes: Int!
    downvotes: Int!
    createdAt: String!
    updatedAt: String!
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
    comments(postId: ID): [Comment]
  }

  type Mutation {
    addComment(input: CreateCommentInput!): Comment
    updateComment(input: UpdateCommentInput!): Comment
    deleteComment(id: ID!): Comment
  }
`;

module.exports = typeDefs;
