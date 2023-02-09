const postModel = require("../model/post.model");

const count = async (filter = {}) => {
  return await postModel.countDocuments(filter);
};

const getOne = async (filter = {}, projection = {}, options = {}) => {
  return await postModel.findOne(filter, projection, options);
};

const getAll = async ({ filter = {}, limit = 0, page = 1 }) => {
  let setPage = page < 1 ? 1 : page;
  const skip = limit * setPage;
  return await postModel.find(filter, { __v: false }).limit(limit).skip(skip);
};

const getById = async (_id) => {
  return await postModel.findById(_id);
};

const createPost = async (data) => {
  const post = new postModel(data);
  return await post.save();
};

module.exports = {
  createPost,
  count,
  getAll,
  getById,
  getOne,
};
