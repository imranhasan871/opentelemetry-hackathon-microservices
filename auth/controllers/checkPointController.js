const checkPointService = require("../services/checkPointService");
const CustomError = require("../utils/Error");

const checkpointController = async (req, res, next) => {
  try {
    console.log("Checkpoint controller");
    const token = req.headers.authorization.split(" ")[1];

    const isCheckPointPassed = await checkPointService({ token });

    if (!isCheckPointPassed) {
      const error = CustomError.unauthorized("Access denied.");
      return next(error);
    }

    res.status(200).json({ message: "Access granted" ,user: isCheckPointPassed});
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = checkpointController;
