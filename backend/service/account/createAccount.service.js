const { saveAuthor, getOne: getOneUser } = require("../../store/account.store");
const createError = require("http-errors");

const createAccount = async (data) => {
  const { email, password } = data;
  const isExist = await getOneUser({ email });
  if (isExist) {
    throw createError.Conflict(`${email} is ready been register`);
  }
  return await saveAuthor({ email, password });
};

module.exports = { createAccount };
