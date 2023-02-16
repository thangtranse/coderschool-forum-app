const hashTagService = require("../../../service/hashtag");
const postService = require("../../../service/post");

const resolvers = {
  Query: {
    recomment_hashtag: async (parent, args, context) => {
      const parseArgs = JSON.parse(JSON.stringify(args));
      const { search } = parseArgs;
      const hashtag = await hashTagService.recommentHashTag(search);
      return hashtag;
    },
  },
  Hashtag: {
    posts: async (parent, args) => {
      const { posts } = parent;
      let listId = posts.map((dPost) => dPost.toString()) || [];
      return postService.getPostByIds(listId);
    },
  },
};

module.exports = resolvers;
