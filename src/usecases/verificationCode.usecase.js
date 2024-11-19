const nodemailer = require("nodemailer");
require("dotenv").config();
const { PASSWORDSMTP, USERSMTP } = process.env;
const VerificationCode = require("../models/verificationCode.model");
const generateRandomCode = require("../lib/crypto");
const User = require("../models/user.model");

async function storeCode() {
  const code = generateRandomCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await VerificationCode.create({
    code: code,
    expiresAt: expiresAt,
    isVerified: false,
  });

  return code;
}

async function verifyCode(inputCode) {
  const record = await VerificationCode.findOne({ code: inputCode });

  if (!record) {
    return { valid: false, message: "Codigo no encontrado" };
  }

  if (record.expiresAt < new Date()) {
    return { valid: false, message: "Codigo expirado" };
  }

  if (record.code !== inputCode) {
    return { valid: false, message: "Codigo invalido" };
  }

  await VerificationCode.deleteOne({ code: inputCode });

  return { valid: true, message: "Codigo validado" };
}

async function verifyUser(email) {
  const isVerified = await User.findOneAndUpdate(
    { email },
    { isVerified: true },
    { new: true }
  );
  if (isVerified === null) {
    return {
      valid: false,
      message: "El usuario no se encuentra en la base de datos",
    };
  }
  return {
    valid: true,
    message: "Usuario validado",
  };
}

async function sendEmail(email, code, variant) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USERSMTP,
      pass: PASSWORDSMTP,
    },
  });
  const mailOptions = {
    from: USERSMTP,
    to: email,
    subject:
      variant === "resetPassword"
        ? "Restablecer contraseña"
        : "Codigo de verificacion",
    text:
      variant === "resetPassword"
        ? `¡Hola! Este es tu codigo de verificacion para reestablecer tu contraseña: ${code} .`
        : `¡Hola! Este es tu codigo de verificacion para validar tu cuenta: ${code} .`, // Contenido del correo
    html:
      variant === "resetPassword"
        ? `<h1>Codigo para reestablecer tu contraseña:</h1><p>Tu codigo es: <strong>${code}</strong></p>`
        : `<h1>Codigo de verificacion para validar tu cuenta</h1><p>Tu codigo es: <strong>${code}</strong></p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
}

module.exports = { sendEmail, storeCode, verifyCode, verifyUser };
