const crypto = require("crypto");

function generateRandomCode() {
  return crypto.randomBytes(3).toString("hex");
}

module.exports = generateRandomCode;
