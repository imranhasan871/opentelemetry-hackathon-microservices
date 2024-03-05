const prisma = require("../../utils/prisma");

/**
 * Updates a user in the database.
 *
 * @param {Object} user - The user object containing the following properties:
 *   - userId {string} - The unique identifier of the user.
 *   - email {string} - The email address of the user.
 *   - password {string} - The password of the user.
 *   - role {string} - The role of the user.
 *   - verified {boolean} - Indicates if the user is verified.
 *   - status {string} - The status of the user.
 *   - lastLoginAt {Date} - The last login date of the user.
 * @returns {Promise<Object>} - A promise that resolves to the updated user object.
 */
const updateUser =async ({
  userId,
  email,
  password,
  role,
  verified,
  status,
  lastLoginAt,
}) => {
  const userData = {
    userId,
    email,
    password,
    role,
    verified,
    status,
    lastLoginAt,
  };


  const result=await prisma.user.update({
    where: {
      userId,
    },
    data: userData,
  });
  console.log("result", result);
  return result;
  
};


/**
 * Find a user by their userId.
 *
 * @param {string} userId - The userId of the user to find.
 * @returns {Promise<Object|null>} - A promise that resolves to the found user object, or null if no user is found.
 */
const findUser = (userId) => {
  return prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });
};

module.exports = { updateUser, findUser };
