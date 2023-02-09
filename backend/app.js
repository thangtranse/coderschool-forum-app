require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  createApolloQueryValidationPlugin,
} = require("graphql-constraint-directive");
const bodyParser = require("body-parser");
const JWT = require("jsonwebtoken");

const app = express();
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
const { schemaWithPermissions } = require("./graphql/schema");
const plugins = [
  createApolloQueryValidationPlugin({
    schema: schemaWithPermissions,
  }),
];

const server = new ApolloServer({
  schema: schemaWithPermissions,
  plugins: plugins,
  context: async ({ req }) => {
    let user = null;
    const authHeader = req.headers["authorization"];
    if (!authHeader) return { user };
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    const statusJwt = await JWT.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return null;
        } else {
          return payload;
        }
      }
    );
    return { user: statusJwt };
  },
});

async function start() {
  await server.start();
  server.applyMiddleware({
    app,
    bodyParserConfig: { limit: "5mb" },
  });
  console.log(`${server.graphqlPath}`);
}

start();

module.exports = app;
