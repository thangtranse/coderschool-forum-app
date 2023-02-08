const createAuthor = require("../../service/account/createAccount.service");

const resolvers = {
  Query: {},
  Mutation: {
    createAccount: async (email, password) => {
      console.log(email);
      console.log(password);
      // await createAuthor({ email, password }),
    },
  },
};

module.exports = resolvers;
