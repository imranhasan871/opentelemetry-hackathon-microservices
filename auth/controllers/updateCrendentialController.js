const joi = require("joi");
const CustomError = require("../utils/Error");
const updateCrendentialService = require("../services/updateCrendentialService");

const updateCrendentialController = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      role: joi.string().required(),
    });
    const validate = schema.validate({ ...req.body, ...req.params });
    if (validate.error) {
      const customError = CustomError.badRequest(validate.error);
      next(customError);
    }

    const updatedUser = await updateCrendentialService(validate.value);

    res.status(200).json({
      message: "User role updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = updateCrendentialController;
