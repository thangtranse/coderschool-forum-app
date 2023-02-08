const createError = require("http-errors");
const { getOne } = require("../../store/account.store");
const {
  REDIS_KEY_DEFAULT,
  signAccessToken,
  signRefreshToken,
  veryfyRefreshToken,
} = require("../../helpers/jwt_service");
const client = require("../../datasource/connection.redis");

const login = async ({ email, password }) => {
  const isUser = await getOne({ email: email });
  if (!isUser) {
    throw createError.NotFound("Account not registered");
  }
  const isValid = await isUser.isCheckPassword(password);
  if (!isValid) {
    throw createError.Unauthorized();
  }
  const access_token = await signAccessToken(isUser._id);
  const refresh_token = await signRefreshToken(isUser._id);

  return {
    access_token,
    refresh_token,
  };
};

const logout = async ({ refresh_token }) => {
  const { userId } = await veryfyRefreshToken(refresh_token);
  client.del(REDIS_KEY_DEFAULT + userId.toString(), (err, reply) => {
    if (err) {
      throw createError.InternalServerError();
    }
  });
  return {
    status: true,
  };
};

const refreshToken = async ({ refresh_token }) => {
  const { userId } = await veryfyRefreshToken(refresh_token);
  const access_token = await signAccessToken(userId);
  const re_refresh_token = await signRefreshToken(userId);
  return {
    access_token,
    refresh_token: re_refresh_token,
  };
};

module.exports = { login, logout, refreshToken };
