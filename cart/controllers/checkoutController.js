const checkoutService = require("../services/checkoutService");
const CustomError = require("../utils/Error");
const joi = require("joi");

const checkoutController = async (req, res, next) => {
  try {
    const sessionId = req.headers.sessionid;
 
    const schema = joi.object({
      sessionId: joi.string().required(),
      userId: joi.string().required(),
      email: joi.string().email().required(),
      name: joi.string().required(),
    });

    const { error, value } = schema.validate({ ...req.body, sessionId });
    if (error) {
      return next(CustomError.badRequest(error, 400));
    }

    // we need to pass user details to checkout service
    const response = await checkoutService(sessionId, {
      userId: value.userId,
      email: value.email,
      name: value.name,
    });
    res.status(200).json(response);
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = checkoutController;
