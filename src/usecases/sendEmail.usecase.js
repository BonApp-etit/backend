const nodemailer = require("nodemailer");
require("dotenv").config();
const { PASSWORDSMTP, USERSMTP } = process.env;
const jwt = require("../lib/jwt");
const User = require("../models/user.model");

const transporter = nodemailer.createTransport({
  service: "gmail", // Usando el servicio de Gmail
  auth: {
    user: USERSMTP, // Tu dirección de correo de Gmail
    pass: PASSWORDSMTP, // Contraseña de aplicación generada
  },
});

// Definir el correo que deseas enviar

function sendEmail(email) {
  const mailOptions = {
    from: USERSMTP, // Dirección del remitente
    to: email, // Dirección del destinatario
    subject: "Prueba de correo SMTP", // Asunto
    text: "¡Hola! Este es un correo enviado desde Nodemailer con SMTP y Gmail.", // Contenido del correo
    html: "<h1>Welcome</h1><p>That was easy!</p>",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
}

module.exports = { sendEmail };
