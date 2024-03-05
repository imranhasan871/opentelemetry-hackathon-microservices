const ENUM = require("../utils/enum.js");
const { createInventoryHistory } = require("./common/inventory_history.js");
const {
  createInventory,
  getInventoryByKey,
  generateInventoryStatus,
} = require("./common/stock.js");

/**
 * Creates a new inventory and inventory history entry.
 *
 * @param {Object} options - The options for creating the stock and stock history.
 * @param {string} options.productId - The ID of the product.
 * @param {number} options.quantity - The quantity of the stock.
 * @returns {Object} - An object containing the created stock and stock history.
 * @throws {Error} - If the productId or quantity is missing.
 */
const createInventoryService = async ({ productId, quantity, sku, status,price }) => {
  const error = new Error();

  if (!productId || !quantity || !sku) {
    error.message = "productId, sku and quantity are required";
    error.status = 400;
    throw error;
  }


  const isExistingInventory = await getInventoryByKey({
    name: "sku",
    value: sku,
  });

  if (isExistingInventory) {
    error.message = "Inventory already exists";
    error.status = 400;
    throw error;
  }

  // Create Stock
  const createdStock = await createInventory({
    productId,
    quantity,
    sku,
    price
  });

  //   Create Stock History
  const newInventoryHistory = await createInventoryHistory({
    productId,
    sku,
    type: ENUM.StockHistoryType["ADDITION"],
    last_stock: 0,
    current_stock: quantity,
  });

  return {
    new_inventory: createdStock,
    new_inventory_history: newInventoryHistory,
  };
};

module.exports = createInventoryService;
