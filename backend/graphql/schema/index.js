const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  createApolloQueryValidationPlugin,
  constraintDirectiveTypeDefs,
} = require("graphql-constraint-directive");
const { merge } = require("lodash");

// const post = require("./post");
// const comment = require("./comment");
const account = require("./account");

const typeDefs = [account.typeDefs];
const resolvers = merge(account.resolvers);

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers: resolvers,
});

module.exports = { schema };
