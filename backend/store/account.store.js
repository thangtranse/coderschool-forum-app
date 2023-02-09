const accountModel = require("../model/account.model");

const getOne = async (filter = {}, projection = {}, options = {}) => {
  return await accountModel.findOne(filter, projection, options);
};

const getAll = async ({ filter = {}, limit = 0, page = 1 }) => {
  let setPage = page < 1 ? 1 : page;
  const skip = limit * setPage;
  return await accountModel
    .find(filter, { __v: false })
    .limit(limit)
    .skip(skip);
};

const getById = async (_id) => {
  return await accountModel.findById(_id);
};

const saveAuthor = async (data) => {
  const author = new accountModel({
    email: data.email,
    password: data.password,
  });
  return await author.save();
};

module.exports = {
  saveAuthor,
  getAll,
  getById,
  getOne,
};
