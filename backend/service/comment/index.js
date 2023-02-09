const createService = require("./create.service");
const readService = require("./read.service");

module.exports = { ...createService, ...readService };
