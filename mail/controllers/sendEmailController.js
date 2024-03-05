const CustomError = require("../utils/Error");
const joi = require("joi");
const sendMailService = require("../services/sendMailService");
const sendEmailController = async (req, res, next) => {
  try {
    const emailSchema = joi.object({
      from: joi.string().email().required(),
      to: joi.string().email().required(),
      subject: joi.string().required(),
      body: joi.string().required(),
    });

    const validate = emailSchema.validate(req.body);
    if (validate.error) {
      const customError = CustomError.badRequest(validate.error);
      next(customError);
    }

    // send email logic here
    const mail = await sendMailService(validate.value);

    res.status(200).json({ message: "Email sent successfully", mail });
  } catch (err) {
    const error = CustomError.severError(err.message, err.status);
    next(error);
  }
};

module.exports = sendEmailController;
