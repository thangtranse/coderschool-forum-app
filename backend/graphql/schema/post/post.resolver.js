const postService = require("../../../service/post");
const accountService = require("../../../service/account");

const resolvers = {
  Query: {
    posts: async (parent, args, context) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      const { hasNextPage, limit } = parseArgs;
      const userId = context.user.userId;
      const posts = await postService.getUserPosts(
        {
          hasNextPage,
          limit,
        },
        userId
      );
      const total = await postService.countUserPosts(userId);
      let isNextPage = null;
      if (posts.length > 0 && posts.length < total) {
        isNextPage = new Date(posts[posts.length - 1].createdAt).getTime();
      }
      return {
        data: posts,
        pageInfo: {
          total: total,
          hasNextPage: isNextPage,
        },
      };
    },
    post: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await postService.getPostByID(parseArgs._id);
    },
  },
  Post: {
    author: async (parent, args) => {
      const { author } = parent;
      return await accountService.getAccountByID(author);
    },
  },
  Mutation: {
    createPost: async (parent, args, context) => {
      const userId = context.user.userId;
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await postService.createNewPost(parseArgs.input, userId);
    },
    updatePost: async (parent, args, context) => {
      const userId = context.user.userId;
      const parseArgs = JSON.parse(JSON.stringify(args));
      return await postService.updateUserPostService(
        parseArgs.input,
        parseArgs._id,
        userId
      );
    },
    deletePost: async (parent, args, context) => {
      const userId = context.user.userId;
      const parseArgs = JSON.parse(JSON.stringify(args));
      const result = await postService.deleteUserPostService(
        parseArgs._id,
        userId
      );
      let status = false;
      if (result) status = true;
      return { status };
    },
  },
};

module.exports = resolvers;
