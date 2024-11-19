const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("VerificationCode", schema);
