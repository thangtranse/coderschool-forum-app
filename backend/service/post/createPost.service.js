const mongoose = require("mongoose");
const {
  createPost,
  updateUserPost,
  deleteUserPost,
} = require("../../store/post.store");
const { updateHashTags } = require("../hashtag");

const createNewPost = async (data, userId) => {
  const result = await createPost({
    ...data,
    author: new mongoose.Types.ObjectId(userId),
  });
  if (result && data.tags && data.tags.length > 0) {
    updateHashTags(data.tags, result._id);
  }
  return result;
};

const updateUserPostService = async (data, postId, userId) => {
  return await updateUserPost(postId, userId, data);
};

const deleteUserPostService = async (postId, userId) => {
  return await deleteUserPost(postId, userId);
};

module.exports = {
  createNewPost,
  updateUserPostService,
  deleteUserPostService,
};
