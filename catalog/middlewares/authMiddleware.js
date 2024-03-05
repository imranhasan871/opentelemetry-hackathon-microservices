const axios = require("axios");
const CustomError = require("../utils/Error");

const authMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.headers.sessionid;
    const token = req.headers.authorization;
    if (!token) {
      return next(CustomError.unauthorized("Unauthorized", 401));
    }
    console.log("token", token);
    const { data } = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/checkpoint`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (!data) {
      return next(CustomError.unauthorized("Unauthorized", 401));
    }

    next();
  } catch (err) {
    next(CustomError.unauthorized(err, 401));
  }
};

module.exports = authMiddleware;
