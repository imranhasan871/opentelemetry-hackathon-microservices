const prisma = require("../utils/prisma");

/**
 * Retrieves a user by their ID.
 *
 * @param {Object} key - The key object containing the name and value of the key.
 * @param {string} key.name - The name of the key.
 * @param {string} key.value - The value of the key.
 * @throws {Error} If the key name is missing, a bad request error is thrown.
 * @returns {Promise<Object>} The user object.
 */
const getUserByIdService = async (key) => {
  const error = new Error();
  if (!key.name) {
    error.message("bad request");
    error.status = 400;
    throw error;
  }

  console.log(key)

  const user = await prisma.user.findUnique({
    where: {
      [key.name]: key.value.trim(),
    },
  });

  return user;
};

module.exports = getUserByIdService;
