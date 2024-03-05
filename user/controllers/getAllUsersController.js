const CustomError = require("../utils/Error");
const getAllUsersService = require("../services/getAllUsersService");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ message: "All Users", users });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};


module.exports= getAllUsersController;