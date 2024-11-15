const express = require("express");
const router = express.Router();
const authUsecase = require("../usecases/auth.usecase");

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authUsecase.login(email, password);
    res.json({
      success: true,
      data: { token },
    });
  } catch (error) {
    res.status(error.status || 500),
      res.json({
        error: error.message,
      });
  }
});

module.exports = router;
