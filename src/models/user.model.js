const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 40,
  },
  email: {
    type: String,
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    // validate: {
    //   validator: validator.isEmail,
    //   message: "Correo electronico no valido",
    // },
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", schema);
