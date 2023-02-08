const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String
    tags: [String]
    author: Account!
    upvotes: Int!
    downvotes: Int!
    createdAt: String!
    updatedAt: String!
    comments: [Comment]
  }

  input PostInput {
    title: String!
    content: String
    tags: [String]
  }

  extend type Query {
    posts(limit: Int, offset: Int): [Post]
    post(id: ID!): Post
  }

  extend type Mutation {
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Post
    upvotePost(id: ID!): Post
    downvotePost(id: ID!): Post
  }
`;

module.exports = typeDefs;
