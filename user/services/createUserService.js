const prisma = require("../utils/prisma");
/**
 * Creates a new user service.
 *
 * @param {Object} user - The user object.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.address - The address of the user.
 * @returns {Promise<Object>} The newly created user object.
 */
const createUserService = async ({ name, email, address }) => {
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      address,
    },
  });
  return newUser;
};

module.exports = createUserService;
