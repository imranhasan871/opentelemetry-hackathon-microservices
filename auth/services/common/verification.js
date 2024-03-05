const axios = require("axios");
const prisma = require("../../utils/prisma");

/**
 * Sends an email verification link to the specified email address.
 *
 * @param {Object} params - The parameters for email verification.
 * @param {string} params.email - The email address to send the verification link to.
 * @param {string} params.verificationCode - The reset code for verification.
 * @returns {void}
 */
const emailVerification = ({ email, verificationCode }) => {
  // const verification_url = `${process.env.AUTH_SERVICE_URL}/verification?verificationCode=${verificationCode}`;

  return axios.post(`${process.env.MAIL_SERVICE_URL}/mails/send`, {
    from: process.env.EMAIL_FROM || "auth@stacklearner.com",
    to: email,
    subject: "Verify your email",
    body: `Thank you for signing up with StackLearner. Please verify your email with the following code: ${verificationCode}`,
  });
};

/**
 * Creates a verification record in the database.
 *
 * @param {Object} params - The parameters for creating the verification.
 * @param {string} params.userId - The ID of the user associated with the verification.
 * @param {string} params.verificationCode - The verification code.
 * @param {Date} params.expiredAt - The expiration date of the verification.
 * @param {string} params.type - The type of the verification.
 * @returns {Promise<Object>} A promise that resolves to the created verification record.
 */
const createVerification = ({ userId, verificationCode, expiredAt, type }) => {
  return prisma.verification.create({
    data: {
      userId,
      verificationCode,
      expiredAt,
      type,
    },
  });
};

/**
 * Finds a verification code in the database.
 *
 * @param {string} verificationCode - The verification code to search for.
 * @returns {Promise<object|null>} - A promise that resolves to the first verification object found with the given verification code, or null if no matching verification is found.
 */
const findVerificationCode = (verificationCode) => {
  return prisma.verification.findFirst({
    where: {
      verificationCode: verificationCode,
    },
  });
};

/**
 * Updates the verification details for a user.
 *
 * @param {Object} params - The parameters for updating the verification.
 * @param {string} params.userId - The ID of the user.
 * @param {string} params.verificationCode - The verification code.
 * @param {string} params.status - The status of the verification.
 * @param {Date} params.expiredAt - The expiration date of the verification.
 * @param {Date} params.verifiedAt - The verification date.
 * @param {string} params.type - The type of verification.
 * @returns {Promise<Object>} A promise that resolves to the updated verification details.
 */
const updateVerification = ({
  verificationCode,
  status,
  expiredAt,
  verifiedAt,
  type,
}) => {
  return prisma.verification.update({
    where: {
      verificationCode,
    },
    data: {
      verificationCode,
      status,
      expiredAt,
      verifiedAt,
      type,
    },
  });
};

/**
 * Generates a verification code.
 *
 * @returns {string} The generated verification code.
 */
const generateVerificationCode = () => {
  // Get current timestamp in milliseconds
  const timestamp = new Date().getTime().toString();

  // Generate a random 2-digit number
  const randomNum = Math.floor(10 + Math.random() * 90); // Ensures 2-digit random number

  // Combine timestamp and random number and extract last 5 digits
  let code = (timestamp + randomNum).slice(-5);

  return code; //
};

module.exports = {
  emailVerification,
  createVerification,
  findVerificationCode,
  updateVerification,
  generateVerificationCode,
};
