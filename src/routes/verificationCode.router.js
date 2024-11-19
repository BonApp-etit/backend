const express = require("express");
const verificationCodeUsecase = require("../usecases/verificationCode.usecase");
const router = express.Router();
const validator = require("validator");
const createError = require("http-errors");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const isValidate = validator.isEmail(email);
    if (!isValidate) {
      throw createError(400, "El email proporcionado no es valido");
    }
    const code = await verificationCodeUsecase.storeCode();
    console.log(code);
    await verificationCodeUsecase.sendEmail(email, code);
    res.json({
      success: true,
      message: "El codigo se ha enviado correctamente",
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      error: error.message,
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

module.exports = router;
