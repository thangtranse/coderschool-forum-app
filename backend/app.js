require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  createApolloQueryValidationPlugin,
} = require("graphql-constraint-directive");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
const { schema } = require("./graphql/schema");
const plugins = [
  createApolloQueryValidationPlugin({
    schema,
  }),
];
const server = new ApolloServer({
  schema: schema,
  plugins: plugins,
});

async function start() {
  await server.start();
  server.applyMiddleware({ app, bodyParserConfig: { limit: "5mb" } });
  console.log(`${server.graphqlPath}`);
}

start();

module.exports = app;
