const { rule } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, context) => {
  console.log(context);
  return context.user !== null;
});

module.exports = {
  isAuthenticated,
};
