const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 40,
  },
  email: {
    type: String,
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", schema);
