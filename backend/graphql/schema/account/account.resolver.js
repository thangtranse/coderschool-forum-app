const createAuthor = require("../../../service/account/createAccount.service");
const {
  getAccountByID,
  getAllAccount,
} = require("../../../service/account/getAccount.service");

const resolvers = {
  Query: {
    accounts: async () => await getAllAccount(),
    account: async (parent, args) => await getAccountByID(args._id),
  },
  Mutation: {
    createAccount: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await createAuthor({
        email: parseArgs.input.email,
        password: parseArgs.input.password,
      });
    },
  },
};

module.exports = resolvers;
