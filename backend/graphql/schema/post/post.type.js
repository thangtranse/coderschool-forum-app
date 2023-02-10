const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    _id: ID!
    title: String
    content: String!
    tags: [String]!

    author: Account

    upvotes: Int!
    downvotes: Int!

    createdAt: String!
    updatedAt: String!
  }

  input PostInput {
    title: String!
    content: String!
    tags: [String]
  }

  type PostPayload {
    status: Boolean
  }

  type PostConnection {
    data: [Post!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    total: Int!
    hasNextPage: Float
  }

  type Query {
    posts(limit: Int, hasNextPage: Float): PostConnection!
    post(_id: ID!): Post
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(_id: ID!, input: PostInput): Post
    deletePost(_id: ID!): PostPayload
  }
`;

module.exports = typeDefs;
