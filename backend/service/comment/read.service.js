const mongoose = require("mongoose");

const { getById, getAll, count } = require("../../store/comment.store");

const countAllPostComment = async (postId) => {
  const filter = {
    post: new mongoose.Types.ObjectId(postId),
  };
  return await count({ filter });
};

const readParentComments = async (postId, limit) => {
  const filter = {
    post: new mongoose.Types.ObjectId(postId),
    parentComment: null,
  };
  return await getAll({ filter, limit });
};

const readComments = async ({ filter, limit }) => {
  return await getAll({ filter, limit });
};

const readComment = async (_id) => {
  return await getById(_id);
};

module.exports = {
  countAllPostComment,
  readComments,
  readComment,
  readParentComments,
};
