const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Hashtag {
    hashtag: String!
    posts: [Post]
    createdAt: String
    updatedAt: String
  }

  type hashtagResult {
    data: [Hashtag!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    total: Int!
    hasNextPage: Float
  }

  type Query {
    recomment_hashtag(search: String): [Hashtag]
    hashtags(search: String, limit: Int, hasNextPage: Float): hashtagResult!
    hashtag(_id: ID!): Hashtag
  }
`;

module.exports = typeDefs;
