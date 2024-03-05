const prisma = require("../utils/prisma");

/**
 * Updates the status of an order.
 *
 * @param {Object} params - The parameters for updating the order status.
 * @param {string} params.status - The new status of the order.
 * @param {number} params.id - The ID of the order to update.
 * @returns {Promise<Object>} - A promise that resolves to the updated order object.
 * @throws {Error} - If the order is not found, an error is thrown with a status code of 404.
 */
const updateOrderService = async ({ status, id }) => {
  const error = new Error();
  // find order by order id
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    error.message = "Order not found";
    error.status = 404;
    throw error;
  }

  //   update order status
  const updatedOrder = await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: status,
    },
  });

  return updatedOrder;
};

module.exports = updateOrderService;
