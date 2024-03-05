const ENUM = require("../utils/enum");
const { updateUser, findUser } = require("./common/user");
const {
  findVerificationCode,
  updateVerification,
} = require("./common/verification");

/**
 * Performs email verification based on the provided verification code.
 *
 * @param {string} verificationCode - The verification code to be used for email verification.
 * @throws {Error} If the verification code is invalid or missing.
 * @returns {boolean} Returns true if the email verification is successful.
 */
const emailVerificationService = async (verificationCode) => {
  const error = new Error("Invalid Verification Code");
  error.status = 400;
  if (!verificationCode) {
    error.message = "Verification Code is required!";
    error.status = 400;
    throw error;
  }

  const verificationResult = await findVerificationCode(verificationCode);

  if(!verificationResult) {
    throw error;
  }

  // Todo: Check if verification code is valid
  const calculateExpire =
    new Date(verificationResult.expiredAt).getTime() - new Date().getTime(); // in milliseconds

  if (
    !verificationResult ||
    verificationResult.status === ENUM.VerificationStatus["USED"] ||
    calculateExpire < 0
  ) {
    throw error;
  }

  const isVerify =
    verificationResult.verificationCode.trim() === verificationCode.trim()
      ? true
      : false;

  if (!isVerify) {
    throw error;
  }

  // Todo: Update User Table
  await updateUser({
    userId: verificationResult.userId,
    email: verificationResult.email,
    password: verificationResult.password,
    role: verificationResult.role,
    verified: true,
    status: ENUM.UserStatus["ACTIVE"],
  });

  // Todo: Update Verification Table
  await updateVerification({
    userId: verificationResult.userId,
    status: ENUM.VerificationStatus["USED"],
    verifiedAt: new Date(),
    verificationCode: verificationResult.verificationCode,
  });

  return true;
};

module.exports = emailVerificationService;
