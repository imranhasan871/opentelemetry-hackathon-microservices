const prisma = require("../utils/prisma");
/**
 * Retrieves all orders from the database.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of order objects.
 */
const getAllOrdersService = async () => {
  const orders = await prisma.order.findMany();
  return orders;
};

module.exports = getAllOrdersService;
