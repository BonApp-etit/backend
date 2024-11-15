const express = require("express");
const router = express.Router();
const userUsecases = require("../usecases/user.usecase");

router.post("/", async (req, res) => {
  try {
    const userCreated = await userUsecases.create(req.body);
    res.json({
      success: true,
      data: {
        userCreated,
      },
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
