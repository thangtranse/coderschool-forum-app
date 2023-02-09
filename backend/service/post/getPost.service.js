const {
  getById: postByID,
  getAll: postGetAll,
  count: postCount
} = require("../../store/post.store");

const getPosts = async ({ page, limit }) => {
  return await postGetAll({ filter: {}, page, limit });
};

const countPosts = async ({ filter }) => {
  return await postCount(filter)
};

const getPostByID = async (_id) => {
  return await postByID(_id);
};

module.exports = { getPosts, getPostByID, countPosts };
