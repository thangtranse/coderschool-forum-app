const PostResolver = require("./post.resolver");
const CommentResolver = require("./comment.resolver");
const AccountResolver = require("./account.resolver");
const { merge } = require("lodash");

module.exports = merge(PostResolver, CommentResolver, AccountResolver);
