const prisma = require("../utils/prisma");
const Jwt = require("../utils/Jwt");
const ENUM = require("../utils/enum");

/**
 * Check if the user has access to a specific service.
 *
 * @param {Object} options - The options object.
 * @param {string} options.token - The access token.
 * @throws {Error} If no token is provided or if access is denied.
 * @returns {Object} The user object if access is granted.
 */
const checkPointService =async ({ token }) => {
  const error = new Error();
  if (!token) {
    error.message = "Access denied. No token provided.";
    error.status = 401;
    throw error;
  }

  const decoded = Jwt.verifyAccessToken(token);

  // Todo: check if user exists or not: you can call user service performing HTTP calls to check if the user exists or not

  const user =await prisma.user.findUnique({
    where: {
      id: decoded.id,
      role: decoded.role,
    },
  });

  console.log(user)

  if (!user || !user.verified || user.status !== ENUM.UserStatus["ACTIVE"]) {
    error.message = "Access denied.";
    error.status = 401;
    throw error;
  }
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
  };
};

module.exports = checkPointService;
