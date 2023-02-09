const { makeExecutableSchema } = require("@graphql-tools/schema");
const { constraintDirectiveTypeDefs } = require("graphql-constraint-directive");
const { merge } = require("lodash");
const { allow, shield } = require("graphql-shield");
const { applyMiddleware } = require("graphql-middleware");

const post = require("./post");
const comment = require("./comment");
const account = require("./account");

const typeDefs = [account.typeDefs, post.typeDefs, comment.typeDefs];
const resolvers = merge(account.resolvers, post.resolvers, comment.resolvers);

const { isAuthenticated } = require("../../helpers/permission.helper");

const permissions = shield({
  Query: {
    // "*": deny,
    // "*": allow,

    // Account
    account: isAuthenticated,
    accounts: isAuthenticated,
    profile: isAuthenticated,
    // POST
    posts: isAuthenticated,
    post: isAuthenticated,
    // COMMENT
    comment: isAuthenticated,
    comments: isAuthenticated,
  },
  Mutation: {
    // "*": deny,
    updateAccount: isAuthenticated,
    deleteAccount: isAuthenticated,
    // POST
    createPost: isAuthenticated,
    updatePost: isAuthenticated,
    deletePost: isAuthenticated,
    // COMMENT
    addComment: isAuthenticated,
  },
});

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers: resolvers,
});
const schemaWithPermissions = applyMiddleware(schema, permissions);

module.exports = { schemaWithPermissions };
