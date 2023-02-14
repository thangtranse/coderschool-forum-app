const getPost = require("./getPost.service");
const createPost = require("./createPost.service");
const votePost = require("./vote.service");

module.exports = { ...getPost, ...createPost, ...votePost };
