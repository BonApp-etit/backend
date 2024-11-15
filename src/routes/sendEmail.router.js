const express = require("express");
const sendEmailUsecase = require("../usecases/sendEmail.usecase");
const router = express.Router();
const validator = require("validator");
const createError = require("http-errors");

router.get("/", (req, res) => {
  try {
    const { email } = req.body;
    // const email = "leonardomp2200gmail.com";
    const isValidate = validator.isEmail(email);
    if (!isValidate) {
      throw createError(401, "El email proporcionado no es valido");
    }
    sendEmailUsecase.sendEmail(email);
    res.json({
      success: true,
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
