const accountModel = require("../model/account.model");

const saveAuthor = async (data) => {
  console.log(data)
  const author = new accountModel({
    email: data.email,
    password: data.password,
  });
  return await author.save();
};

module.exports = {
  saveAuthor,
};
