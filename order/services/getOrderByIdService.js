const prisma = require("../utils/prisma");

/**
 * Retrieves an order by its ID.
 *
 * @param {number} orderId - The ID of the order to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the order object.
 * @throws {Error} - If the order is not found, an error with a status code of 404 is thrown.
 */
const getOrderByIdService = async (orderId) => {
  const error = new Error("Order not found");
  // get order by id
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    error.status = 404;
    throw error;
  }

  return order;
};

module.exports = getOrderByIdService;
