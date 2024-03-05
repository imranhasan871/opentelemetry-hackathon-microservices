const joi = require("joi");
const CustomError = require("../utils/Error");
const updateUserByIdService = require("../services/updateUserByIdService");

const updateUserController = async (req, res, next) => {
  try {

    const userSchema = joi
      .object({
        name: joi.string().optional(),
        email: joi.string().optional(),
        address: joi.string().optional(),
        id: joi.string().required(),
      })
      .or("name", "email", "address");

    const validate = userSchema.validate({ ...req.body, ...req.params });
      console.log(req.body)

    if (validate.error) {
      const error = CustomError.badRequest(validate.error, 400);
      next(error);
    }

    // Update user
    const user = await updateUserByIdService(validate.value);

    res.status(200).json({ message: "User found", user: user });
  } catch (err) {
    const error = CustomError.severError(err.message, err.status);
    next(error);
  }
};

module.exports = updateUserController;
