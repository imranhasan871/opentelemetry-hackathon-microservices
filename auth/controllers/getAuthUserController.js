const { findUser } = require("../services/common/user");
const CustomError = require("../utils/Error");

const getAuthUserController = async (req, res, next) => {
  try {
    let error;
    const userId = req.params.userId;

    if (!userId) {
      error = CustomError.badRequest("User Id is required", 400);
      return next(error);
    }
    const user = await findUser(userId?.trim());

    if (!user) {
      error = CustomError.notFound("User not found", 404);
      return next(error);
    }
    res.status(200).json({
      message: "Success",
      user: user,
    });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};


module.exports = getAuthUserController;
