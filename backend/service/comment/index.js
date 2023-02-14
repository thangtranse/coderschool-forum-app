const createService = require("./create.service");
const readService = require("./read.service");
const voteService = require("./vote.service");

module.exports = { ...createService, ...readService, ...voteService };
