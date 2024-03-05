const prisma = require("../utils/prisma");

/**
 * Retrieves a product from the database based on a given key.
 *
 * @param {Object} key - The key object containing the name and value.
 * @param {string} key.name - The name of the key.
 * @param {string} key.value - The value of the key.
 * @throws {Error} If the key name is missing, a "Bad Request!" error is thrown with a status code of 400.
 * @returns {Promise<Object|null>} A promise that resolves to the product object if found, or null if not found.
 */
const getProductByKeyService = async (key) => {
  const error = new Error();
  if (!key.name) {
    error.message = "Bad Request!";
    error.status = 400;
    throw error;
  }

  const product = await prisma.product.findFirst({
    where: {
      [key.name]: key.value,
    },
  });

  return product;
};

module.exports = getProductByKeyService;
