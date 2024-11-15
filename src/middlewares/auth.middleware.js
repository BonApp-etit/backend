const createError = require("http-errors");
const jwt = require("../lib/jwt");
const userUseCase = require("../usecases/user.usecase");

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      createError(401, "JWT is required");
    }
    const payload = jwt.verify(token);

    const user = await userUseCase.getById(payload.id);

    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    res.status(401);
    res.json({
      succcess: false,
      error: error.message,
    });
  }
}

module.exports = auth;
