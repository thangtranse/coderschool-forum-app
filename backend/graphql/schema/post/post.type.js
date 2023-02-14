const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    _id: ID!
    title: String
    content: String!
    tags: [String]!
    author: Account
    upvotes: Upvote
    comments: CommentType
    downvotes: Downvote
    createdAt: String!
    updatedAt: String!
  }

  type Upvote {
    users: [Account]
    count: Int!
  }
  
  type CommentType {
    comments: [Comment]
    count: Int!
  }

  type Downvote {
    users: [Account]
    count: Int!
  }

  input PostInput {
    title: String!
    content: String!
    tags: [String]
  }

  type PostPayload {
    status: Boolean
  }

  type VotePayload {
    status: Boolean
    upvotes: Upvote
    downvotes: Downvote
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
    upvotePost(_id: ID!): VotePayload
    downvotePost(_id: ID!): VotePayload
  }
`;

module.exports = typeDefs;
