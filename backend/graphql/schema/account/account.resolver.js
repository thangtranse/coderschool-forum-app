const accountService = require("../../../service/account");

const resolvers = {
  Query: {
    accounts: async () => await accountService.getAllAccount(),
    account: async (parent, args) =>
      await accountService.getAccountByID(args._id),
  },
  Mutation: {
    createAccount: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await accountService.createAccount({
        email: parseArgs.input.email,
        password: parseArgs.input.password,
      });
    },
    login: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await accountService.login({
        email: parseArgs.input.email,
        password: parseArgs.input.password,
      });
    },
    logout: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await accountService.logout({
        refresh_token: parseArgs.input.refresh_token,
      });
    },
    refreshToken: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await accountService.refreshToken({
        refresh_token: parseArgs.input.refresh_token,
      });
    },
  },
};

module.exports = resolvers;
