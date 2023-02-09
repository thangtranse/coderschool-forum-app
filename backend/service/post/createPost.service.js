const createError = require("http-errors");
const mongoose = require("mongoose");

const { createPost, updateUserPost } = require("../../store/post.store");

const createNewPost = async (data, userId) => {
  return await createPost({
    ...data,
    author: new mongoose.Types.ObjectId(userId),
  });
};

const updateUserPostService = async (data, postId, userId) => {
  return await updateUserPost(postId, userId, data);
};

module.exports = { createNewPost, updateUserPostService };
