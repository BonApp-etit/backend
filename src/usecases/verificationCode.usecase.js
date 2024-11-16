const nodemailer = require("nodemailer");
require("dotenv").config();
const { PASSWORDSMTP, USERSMTP } = process.env;
const VerificationCode = require("../models/verificationCode.model");
const generateRandomCode = require("../lib/crypto");

async function storeCode(email) {
  const code = generateRandomCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await VerificationCode.create({
    email: email,
    code: code,
    expiresAt: expiresAt,
  });

  return code;
}

async function verifyCode(email, inputCode) {
  const record = await VerificationCode.findOne({ email });

  if (!record) {
    return { valid: false, message: "Codigo no encontrado" };
  }

  if (record.expiresAt < new Date()) {
    return { valid: false, message: "Codigo expirado" };
  }

  if (record.code !== inputCode) {
    return { valid: false, message: "Codigo invalido" };
  }

  await VerificationCode.deleteOne({ email });

  return { valid: true };
}

async function sendEmail(email, code) {
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
    subject: "Codigo de verificacion",
    text: `¡Hola! Este es tu codigo de verificacion: ${code} .`, // Contenido del correo
    html: `<h1>Codigo de verificacion</h1><p>Tu codigo es: <strong>${code}</strong></p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
}

module.exports = { sendEmail, storeCode, verifyCode };
