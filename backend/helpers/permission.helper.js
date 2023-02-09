const { rule } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, context) => {
  return context.user !== null;
});

module.exports = {
  isAuthenticated,
};
