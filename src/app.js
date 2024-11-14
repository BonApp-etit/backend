const express = require("express");
const userRouter = require("./routes/user.router");
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.json({
    message: "BonAppetit",
  });
});

module.exports = app;
