const prisma = require("../utils/prisma");

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 */
const getAllUsersController = async () => {
  const users = await prisma.user.findMany();
  return users;
};

module.exports = getAllUsersController;
