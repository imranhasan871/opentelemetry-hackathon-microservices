const prisma = require("../utils/prisma");

/**
 * Updates a user by their ID.
 *
 * @param {Object} data - The data for updating the user.
 * @param {string} data.id - The ID of the user to update.
 * @param {string} [data.username] - The new username for the user (optional).
 * @param {string} [data.email] - The new email for the user (optional).
 * @param {string} [data.address] - The new address for the user (optional).
 * @returns {Promise<Object>} - The updated user object.
 * @throws {Error} - If the user ID is missing, or if the user is not found.
 */
const updateUserByIdService = async (data) => {
  const error = new Error();
  if (!data.id) {
    error.message = "User id is required";
    error.status = 400;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!existingUser) {
    error.message = "User not found";
    error.status = 404;
    throw error;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      username: data.username || existingUser.username,
      email: data.email || existingUser.email,
      address: data.address || existingUser.address,
    },
  });

  return updatedUser;
};

module.exports = updateUserByIdService;
