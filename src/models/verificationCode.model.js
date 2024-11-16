const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Correo electronico no valido para envio de codigo",
    },
  },
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
