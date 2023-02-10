const mongoose = require("mongoose");
const commentModel = require("../model/comment.model");

const commentCreate = async (data) => {
  const comment = new commentModel(data);
  if (data.parentComment) {
    await commentModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(data.parentComment),
      },
      {
        $push: { childComments: comment._id },
      },
      { new: true }
    );
  }
  await comment.save();
  return comment;
};

const getOne = async (filter = {}, projection = {}, options = {}) => {
  return await commentModel.findOne(filter, projection, options);
};

const getAll = async ({ filter = {}, limit = 10, page = 1 }) => {
  let setPage = page < 1 ? 1 : page;
  const skip = limit * (setPage - 1);
  return await commentModel
    .find(filter, { __v: false })
    .limit(limit)
    .skip(skip);
};

const getById = async (_id) => {
  return await commentModel.findById(_id);
};

module.exports = {
  commentCreate,
  getOne,
  getAll,
  getById,
};
