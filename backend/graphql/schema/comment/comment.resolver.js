const commentService = require("../../../service/comment");
const accountService = require("../../../service/account");
const postService = require("../../../service/post");

const resolvers = {
  Query: {
    comment: async (parent, { id }, context) => {
      return commentService.readComment(id);
    },
    comments: async (parent, { postId, limit }) => {
      return await commentService.readParentComments(postId, limit);
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
      const comments = await commentService.readComments({
        filter: { _id: { $in: childComments } },
        limit: 0,
      });
      return {
        comments: comments,
        count: comments.length,
      };
    },
    upvotes: async (parent, args) => {
      const { upvotes } = parent;
      const { users, count } = upvotes;
      return {
        users: accountService.getAllAccount({
          filter: { _id: { $in: users } },
        }),
        count: count,
      };
    },
    downvotes: async (parent, args) => {
      const { downvotes } = parent;
      const { users, count } = downvotes;
      return {
        users: accountService.getAllAccount({
          filter: { _id: { $in: users } },
        }),
        count: count,
      };
    },
  },
  Mutation: {
    addComment: async (parent, args, context, info) => {
      const userId = context.user.userId;
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await commentService.createComment(parseArgs.input, userId);
    },
    upvoteComment: async (parent, args, context) => {
      const userId = context.user.userId;
      const { id: commentId } = JSON.parse(JSON.stringify(args));
      const result = await commentService.upvote(commentId, userId);
      let status = false;
      const upvotes = {
        users: [],
        count: 0,
      };
      const downvotes = {
        users: [],
        count: 0,
      };
      if (result) {
        status = true;
        upvotes.users = result.upvotes.users;
        upvotes.count = result.upvotes.count;
        downvotes.users = result.downvotes.users;
        downvotes.count = result.downvotes.count;
      }
      return { status, upvotes, downvotes };
    },
    downvoteComment: async (parent, args, context) => {
      const userId = context.user.userId;
      const { id: commentId } = JSON.parse(JSON.stringify(args));
      const result = await commentService.downvote(commentId, userId);
      let status = false;
      const upvotes = {
        users: [],
        count: 0,
      };
      const downvotes = {
        users: [],
        count: 0,
      };
      if (result) {
        status = true;
        upvotes.users = result.upvotes.users;
        upvotes.count = result.upvotes.count;
        downvotes.users = result.downvotes.users;
        downvotes.count = result.downvotes.count;
      }
      return { status, upvotes, downvotes };
    },
  },
};

module.exports = resolvers;
