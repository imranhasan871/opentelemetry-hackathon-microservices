const getAllMailService = require("../services/getAllMailService");
const CustomError = require("../utils/Error");

const getAllMailController = async (req, res, next) => {
  try {
    const mails = await getAllMailService();

    res.status(200).json({ mails });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    console.log("error", error);
    next(error);
  }
};

module.exports = getAllMailController;
