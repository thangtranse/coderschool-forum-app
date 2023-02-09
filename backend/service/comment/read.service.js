const mongoose = require("mongoose");

const { getById, getAll } = require("../../store/comment.store");

const readComments = async ({ page, limit }) => {
  return await getAll({ filter: {}, page, limit });
};

const readComment = async (_id) => {
  return await getById(_id);
};

module.exports = { readComments, readComment };
