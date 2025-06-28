const express = require("express");
const verificationCodeUsecase = require("../usecases/verificationCode.usecase");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  try {
    const { email, variant } = req.body;

    const code = await verificationCodeUsecase.storeCode();
    const token = await verificationCodeUsecase.sendEmail(email, code, variant);
    console.log(code);

    res.json({
      success: true,
      message:
        variant === "resetPassword"
          ? "Correo para reestablecer la contraseña enviado"
          : "Correo para verificacion de cuenta enviado",
      data: { token },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: "Hubo un problema enviando el correo",
    });
  }
});

router.post("/validation", async (req, res) => {
  try {
    const { email, code } = req.body;
    const isValidate = await verificationCodeUsecase.verifyCode(code);
    if (!isValidate.valid) {
      throw createError(400, isValidate.message);
    }
    const isVerified = await verificationCodeUsecase.verifyUser(email);
    if (!isVerified.valid) {
      throw createError(400, "Codigo no valido");
    }

    res.json({
      success: true,
      message: "Code validate correctly",
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      error: error.message,
    });
  }
});

router.patch("/reset_password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throw createError(400, "Token y nueva contraseña son requeridos");
    }

    const validationResult = await verificationCodeUsecase.verifyTemporaryToken(
      token
    );

    if (!validationResult.valid) {
      throw createError(400, validationResult.message);
    }

    const email = validationResult.email;

    // Aquí puedes actualizar la contraseña del usuario
    const user = await User.findOneAndUpdate(
      { email },
      { password: newPassword }, // Asegúrate de hashear la contraseña antes de guardarla
      { new: true }
    );

    if (!user) {
      throw createError(404, "Usuario no encontrado");
    }

    res.json({
      success: true,
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
