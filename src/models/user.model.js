const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      max: 40,
    },
    email: {
      type: String,
      required: true,
      // unique: true,

      validate: {
        validator: validator.isEmail,
        message: "Correo electronico no valido",
      },
    },

    password: {
      type: String,
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "client"] },
    // Propiedades adicionales para administradores
    restaurantLogo: { type: String },
    restaurantName: { type: String },
    telephone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", schema);
