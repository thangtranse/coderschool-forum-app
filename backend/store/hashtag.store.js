const mongoose = require("mongoose");
const hashTagModel = require("../model/hashtag.model");

const count = async (filter) => {
  return await hashTagModel.countDocuments(filter);
};

const createHashtag = async (data) => {
  const hashtag = new hashTagModel(data);
  return await hashtag.save();
};

const getAll = async ({ filter = {}, limit = 10, sort }) => {
  return await hashTagModel.find(filter).sort(sort).limit(limit);
};

const findOneByHashtag = async (hashtag) => {
  return await hashTagModel.findOne({ hashtag: hashtag });
};

const findOneAndUpdateHashtag = async (hashtag, postId) => {
  return await hashTagModel.findOneAndUpdate(
    { hashtag: hashtag },
    {
      $addToSet: { posts: postId },
      $inc: { count: 1 },
    },
    { upsert: true, new: true }
  );
};

module.exports = {
  getAll,
  findOneByHashtag,
  count,
  findOneAndUpdateHashtag,
  createHashtag,
};
