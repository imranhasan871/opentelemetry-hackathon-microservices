const Jwt = require("../utils/Jwt");
const Password = require("../utils/Password");
const ENUM = require("../utils/enum");

const prisma = require("../utils/prisma");
const { updateUser } = require("./common/user");


/**
 * Sign in service function.
 * 
 * @param {Object} params - The parameters object.
 * @param {string} params.email - The user's email.
 * @param {string} params.password - The user's password.
 * @returns {string} - The JWT access token.
 * @throws {Error} - If email or password is missing, user is not found, user is not verified or active, or password is incorrect.
 */
const signInService = async ({ email, password }) => {
  const error = new Error();

  if (!email || !password) {
    error.message = "Email and Password is required!";
    error.status = 400;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    error.message = "User not found!";
    error.status = 404;
    throw error;
  }
  if (
    !existingUser.verified ||
    existingUser.status !== ENUM.UserStatus["ACTIVE"]
  ) {
    error.message = "Access denied. verify your account first!";
    error.status = 401;
    throw error;
  }

  const isValidPassword = await Password.verify(
    password,
    existingUser.password
  );

  if (!isValidPassword) {
    error.message = "Password is incorrect!";
    error.status = 401;

    throw error;
  }

  const token = Jwt.signAccessToken({
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
  });

  console.log("existingUser", existingUser);
  const u = await updateUser({
    userId: existingUser.userId,
    lastLoginAt: new Date(),
  });
  console.log("User", u);
  return token;
};

module.exports = signInService;
