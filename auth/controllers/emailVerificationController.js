const CustomError = require("../utils/Error");
const emailVerificationService = require("../services/emailVerificationService");
const emailVerificationController = async (req, res, next) => {
  try {
    const verificationCode=req.body.code

    const isVerify = await emailVerificationService(verificationCode);

    res.status(200).json({
      message: "Email Verified",
      data: isVerify,
    });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = emailVerificationController;
