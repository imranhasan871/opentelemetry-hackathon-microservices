const prisma = require("../utils/prisma");
/**
 * Retrieves line items for a given order ID.
 *
 * @param {number} orderId - The ID of the order.
 * @returns {Promise<Array>} - A promise that resolves to an array of line items.
 */
const getLineItemsService = (orderId) => {
  return prisma.lineItem.findMany({
    where: {
      orderId: orderId,
    },
  });
};

module.exports = getLineItemsService;
