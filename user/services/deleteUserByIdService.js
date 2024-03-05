const prisms = require("../utils/prisma");

/**
 * Deletes a user by their ID.
 *
 * @param {string} id - The ID of the user to be deleted.
 * @throws {Error} If the ID is not provided.
 * @throws {Error} If the user with the provided ID is not found.
 * @returns {Promise<Object>} The deleted user object.
 */
const deleteUserByIdService = async (id) => {
  const error = new Error();

  if (!id) {
    error.message = "User id is required";
    error.status = 400;
    throw error;
  }

  const existingUser = await prisms.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    error.message = "User not found";
    error.status = 404;
    throw error;
  }

  const deletedUser = await prisms.user.delete({
    where: {
      id,
    },
  });

  return deletedUser;
};

module.exports = deleteUserByIdService;
