const mongoose = require("mongoose");
const accountModel = require("../model/account.model");

const getAll = async () => {
  return await accountModel.find();
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
};
