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
    title: String
    content: String!
    tags: [String]!
  }

  type PostPayload {
    status: Boolean
  }

  type PostConnection {
    data: [PostData!]!
    pageInfo: PageInfo!
  }

  type PostData {
    cursor: String!
    node: Post!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type Query {
    posts(page: Int, limit: Int): PostConnection!
    post(_id: ID!): Post
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(_id: ID!, input: PostInput): Post
    deletePost(_id: ID!): PostPayload
  }
`;

module.exports = typeDefs;
