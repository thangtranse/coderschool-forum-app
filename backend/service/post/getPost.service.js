const { default: mongoose } = require("mongoose");
const {
  getById: postByID,
  getAll: postGetAll,
  count: postCount,
} = require("../../store/post.store");

const getPosts = async ({ page, limit }) => {
  return await postGetAll({ filter: {}, page, limit });
};

const countUserPosts = async (userId) => {
  return await postCount({ author: new mongoose.Types.ObjectId(userId) });
};

const getUserPosts = async ({ hasNextPage, limit }, userId) => {
  const filter = {};
  filter.author = new mongoose.Types.ObjectId(userId);
  filter.createdAt = { $lt: new Date() };
  if (hasNextPage) {
    try {
      filter.createdAt = { $lt: new Date(hasNextPage) };
    } catch (error) {
      console.log(error);
    }
  }
  const sort = { createdAt: -1 };
  return await postGetAll({ filter, limit, sort });
};

const countPosts = async (filter) => {
  return await postCount(filter);
};

const getPostByID = async (_id) => {
  return await postByID(_id);
};

module.exports = {
  getPosts,
  getPostByID,
  countPosts,
  getUserPosts,
  countUserPosts,
};
