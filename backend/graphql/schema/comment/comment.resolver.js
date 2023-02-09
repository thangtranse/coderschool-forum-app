const commentService = require("../../../service/comment");
const accountService = require("../../../service/account");

const resolvers = {
  Query: {
    comment: async (parent, { postId }, context) => {
      return commentService.readComment(postId);
    },
    comments: async (parent, { page = 1, limit = 10 }) => {
      const commets = await commentService.readComments({ page, limit });
      return commets;
    },
  },
  Comment: {
    author: async (parent, args) => {
      const { author } = parent;
      return await accountService.getAccountByID(author);
    },
    post: async (parent, args) => {
      return {};
    },
    parentComment: () => {
      return {};
    },
    childComments: () => {
      return [];
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
