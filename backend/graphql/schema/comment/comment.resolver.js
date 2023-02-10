const commentService = require("../../../service/comment");
const accountService = require("../../../service/account");
const postService = require("../../../service/post");

const resolvers = {
  Query: {
    comment: async (parent, { postId }, context) => {
      return commentService.readComment(postId);
    },
    comments: async (parent, { postId, page }) => {
      return await commentService.readParentComments(postId, page);
    },
  },
  Comment: {
    author: async (parent, args) => {
      const { author } = parent;
      return await accountService.getAccountByID(author);
    },
    post: async (parent, args) => {
      const { post } = parent;
      return await postService.getPostByID(post);
    },
    parentComment: async (parent, args) => {
      const { parentComment } = parent;
      return await commentService.readComment(parentComment);
    },
    childComments: async (parent, args) => {
      const { childComments } = parent;
      return await commentService.readComments({
        filter: { _id: { $in: childComments } },
      });
    },
  },
  Mutation: {
    addComment: async (parent, args, context, info) => {
      const userId = context.user.userId;
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await commentService.createComment(parseArgs.input, userId);
    },
  },
};

module.exports = resolvers;
