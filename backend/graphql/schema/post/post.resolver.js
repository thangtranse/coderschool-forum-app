const postService = require("../../../service/post");
const accountService = require("../../../service/account");
const commentService = require("../../../service/comment");

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
      return accountService.getAccountByID(author);
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
    comments: async (parent, args) => {
      const { _id: postId } = parent;
      const comments = await commentService.readParentComments(postId, 4);
      const countComments = await commentService.countAllPostComment(postId);
      console.log(countComments)
      return {
        comments: comments,
        count: countComments,
      };
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
    upvotePost: async (parent, args, context) => {
      const userId = context.user.userId;
      const { _id: postId } = JSON.parse(JSON.stringify(args));
      const result = await postService.upvotePost(postId, userId);
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
    downvotePost: async (parent, args, context) => {
      const userId = context.user.userId;
      const { _id: postId } = JSON.parse(JSON.stringify(args));
      const result = await postService.downvotePost(postId, userId);
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
