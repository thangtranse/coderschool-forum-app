const getPost = require("./getPost.service");
const createPost = require("./createPost.service");

module.exports = { ...getPost, ...createPost };
