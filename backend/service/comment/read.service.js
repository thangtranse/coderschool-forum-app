const mongoose = require("mongoose");

const { getById, getAll } = require("../../store/comment.store");

const readParentComments = async (postId, page) => {
  const filter = {
    post: new mongoose.Types.ObjectId(postId),
    parentComment: null,
  };
  return await getAll({ filter, page });
};

const readComments = async ({ filter, page, limit }) => {
  return await getAll({ filter, page, limit });
};

const readComment = async (_id) => {
  return await getById(_id);
};

module.exports = { readComments, readComment, readParentComments };
