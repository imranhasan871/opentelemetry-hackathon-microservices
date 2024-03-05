const { getAllInventory } = require("./common/stock");
/**
 * Retrieves all stock data from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of stock objects.
 */
const getAllInventoryService = async () => {
  const stocks = await getAllInventory();
  return stocks;
};

module.exports = getAllInventoryService;
