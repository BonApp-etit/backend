const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "BonAppetit",
  });
});

module.exports = app;
