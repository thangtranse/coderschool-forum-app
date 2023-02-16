const mongoose = require("mongoose");
const postModel = require("../model/post.model");

const count = async (filter) => {
  return await postModel.countDocuments(filter);
};

const getOne = async (filter = {}, projection = {}, options = {}) => {
  return await postModel.findOne(filter, projection, options);
};

const getAll = async ({ filter = {}, limit = 10, sort }) => {
  return await postModel
    .find(filter, { __v: false })
    .sort(sort)
    .limit(limit)
};

const getById = async (_id) => {
  return await postModel.findById(_id);
};

const createPost = async (data) => {
  const post = new postModel(data);
  return await post.save();
};

const updateUserPost = async (postId, userId, dataUpdate) => {
  return await postModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(postId),
      author: new mongoose.Types.ObjectId(userId),
    },
    { $set: dataUpdate },
    { new: true }
  );
};

const deleteUserPost = async (postId, userId) => {
  const a = await postModel.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(postId),
    author: new mongoose.Types.ObjectId(userId),
  });
  return a;
};

module.exports = {
  createPost,
  updateUserPost,
  deleteUserPost,
  count,
  getAll,
  getById,
  getOne,
};
