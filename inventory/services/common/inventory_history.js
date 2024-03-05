const prisma = require("../../utils/prisma");

/**
 * Creates a stock history record.
 *
 * @param {Object} options - The options for creating the stock history.
 * @param {number} options.productId - The ID of the product.
 * @param {number} options.current_stock - The quantity of the product.
 * @param {number} options.last_stock - The quantity of the product
 * @param {string} options.sku - The SKU of the product.
 * @param {string} options.type - The type of the stock history.
 * @returns {Promise<Object>} The created stock history record.
 */
const createInventoryHistory = async ({
  productId,
  current_stock,
  last_stock,
  sku,
  type,
}) => {
  return prisma.stockHistory.create({
    data: {
      productId,
      sku,
      type,
      last_stock,
      current_stock,
    },
  });
};


/**
 * Retrieves the inventory history based on the provided parameters.
 *
 * @param {Object} params - The parameters for filtering the inventory history.
 * @param {string} params.name - The name of the property to filter by.
 * @param {any} params.value - The value of the property to filter by.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of inventory history objects.
 */
const getInventoryHistory = ({ name, value }) => {
  return prisma.stockHistory.findMany({
    where: {
      [name]: value,
    },
  });
};
module.exports = { createInventoryHistory, getInventoryHistory };
