const postService = require("../../../service/post");
const accountService = require("../../../service/account");

const resolvers = {
  Query: {
    posts: async (parent, { page = 1, limit = 10 }) => {
      const posts = await postService.getPosts({ page, limit });
      const total = await postService.countPosts({ filter: {} });
      return {
        data: posts,
        pageInfo: {
          total: total,
          hasNextPage: page * limit < total,
          hasPreviousPage: page > 1,
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
