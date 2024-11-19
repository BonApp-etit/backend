const express = require("express");
const router = express.Router();
const authUsecase = require("../usecases/auth.usecase");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authUsecase.login(email, password);

    res.json({
      success: true,
      message: {
        data: { token },
      },
    });
  } catch (error) {
    let statusCode = error.status || 500;
    let errorMessage = error.message;

    if (errorMessage === "Account not verified") {
      statusCode = 401;
    }
    res.status(statusCode || 500),
      res.json({
        success: false,
        message: errorMessage,
      });
  }
});

router.post("/resetPassword", (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
