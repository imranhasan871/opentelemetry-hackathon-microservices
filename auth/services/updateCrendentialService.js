const prisma = require("../utils/prisma");

/**
 * Updates the credentials of a user.
 *
 * @param {Object} params - The parameters for updating the credentials.
 * @param {string} params.email - The email of the user.
 * @param {string} params.role - The new role of the user.
 * @returns {Object} - The updated user's email and role.
 * @throws {Error} - If the user is not found.
 */
const updateCrendentialService = async ({ email, role }) => {
  const error = new Error();

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    error.message = "User not found";
    error.status = 404;
    throw error;
  }

  console.log("email", email);
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      role: role.toUpperCase(),
    },
  });

  console.log(updatedUser)

  return {
    email: updatedUser.email,
    role: updatedUser.role,
  };
};

module.exports = updateCrendentialService;
