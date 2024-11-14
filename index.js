const express = require("express");
require("dotenv").config();
const db = require("./src/lib/db");
const app = require("./src/app");
const port = process.env.PORT || 8080;

try {
  db.connect();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (error) {
  console.error("Error de conexion: ", error);
}
