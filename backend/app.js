require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolver");

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function start() {
  await server.start();
  server.applyMiddleware({ app });
  console.log(`${server.graphqlPath}`);
}

start();

module.exports = app;
