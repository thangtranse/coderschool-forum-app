const mongoose = require("mongoose");

const {
  createPost,
  updateUserPost,
  deleteUserPost,
} = require("../../store/post.store");

const createNewPost = async (data, userId) => {
  return await createPost({
    ...data,
    author: new mongoose.Types.ObjectId(userId),
  });
};

const updateUserPostService = async (data, postId, userId) => {
  return await updateUserPost(postId, userId, data);
};

const deleteUserPostService = async (postId, userId) => {
  return await deleteUserPost(postId, userId);
};

module.exports = { createNewPost, updateUserPostService, deleteUserPostService };
