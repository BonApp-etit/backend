const User = require("../models/user.model");
const createError = require("http-errors");

async function create(userData) {
  const existUser = await User.findOne({
    email: userData.email,
  });
  if (existUser) {
    throw createError(409, "Email already in use");
  }

  const newUser = await User.create(userData);
  return newUser;
}

module.exports = {
  create,
};
