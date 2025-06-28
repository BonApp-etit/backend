const jsonwebtoken = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function sign(payload, expiration = "1d") {
  return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: expiration });
}

function verify(token) {
  return jsonwebtoken.verify(token, JWT_SECRET);
}

module.exports = {
  sign,
  verify,
};
