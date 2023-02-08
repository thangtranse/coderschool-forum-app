const {
  saveAuthor,
  getById,
  getAll,
} = require("../../store/account.store");

const getAllAccount = async () => {
  return await getAll();
};

const getAccountByID = async (_id) => {
  return await getById(_id);
};

module.exports = { getAllAccount, getAccountByID };
