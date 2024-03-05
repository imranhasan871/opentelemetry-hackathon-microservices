const prisma = require("../utils/prisma");

/**
 * Retrieves all mail services.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of mail service objects.
 */
const getAllMailService = () => {
  return prisma.mail.findMany();
};

module.exports = getAllMailService;
