const postService = require("../../../service/post");

const resolvers = {
  Query: {
    posts: async (parent, { page = 1, limit = 10 }) => {
      const posts = await postService.getPosts({ page, limit });
      const total = await postService.countPosts({ filter: {} });
      return {
        data: posts.map((post) => ({
          cursor: post.id,
          node: post,
        })),
        pageInfo: {
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
  Mutation: {
    createPost: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return {};
    },
    updatePost: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return {};
    },
    deletePost: async (parent, args) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      return {};
    },
  },
};

module.exports = resolvers;
