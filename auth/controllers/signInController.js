const signInService = require("../services/signInService");
const CustomError = require("../utils/Error");
const joi = require("joi");

const signINController = async (req, res, next) => {
  try {

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),

    });

    const validate=schema.validate(req.body)

    if(validate.error){
      const error = CustomError.badRequest(validate.error);
      return next(error);
    }

    const token = await signInService(validate.value);

    if (!token) {
      const error = CustomError.unauthorized("Invalid Email or Password");
      return next(error);
    }

    res.status(200).json({ token });
  } catch (err) {
    const error =  CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = signINController;
