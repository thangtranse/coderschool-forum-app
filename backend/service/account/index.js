const getAccount = require("./getAccount.service");
const authentication = require("./authentication.service");
const createAccount = require("./createAccount.service");

module.exports = { ...getAccount, ...authentication, ...createAccount };
