const mongoose = require("mongoose");

const { commentCreate } = require("../../store/comment.store");

const createComment = async (data, userId) => {
  return await commentCreate({
    ...data,
    author: new mongoose.Types.ObjectId(userId),
    post: new mongoose.Types.ObjectId(data.postId),
  });
};

module.exports = { createComment };
