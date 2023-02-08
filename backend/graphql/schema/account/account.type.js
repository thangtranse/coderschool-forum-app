const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Account {
    _id: ID!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  input AccountInput {
    email: String @constraint(minLength: 5, format: "email")
    password: String
  }

  input AuthorInput {
    refresh_token: String
  }

  type AuthorPayload {
    access_token: String!
    refresh_token: String!
    status: Boolean!
  }

  type Query {
    accounts: [Account]!
    account(_id: ID!): Account
  }

  type Mutation {
    login(input: AccountInput): AuthorPayload
    logout(input: AuthorInput): AuthorPayload
    refreshToken(input: AuthorInput): AuthorPayload
    createAccount(input: AccountInput): Account
    updateAccount(_id: ID!, input: AccountInput): Account
    deleteAccount(_id: ID!): Account
  }
`;

module.exports = typeDefs;
