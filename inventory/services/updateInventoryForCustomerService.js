const ENUM = require("../utils/enum");
const {
  getInventoryByKey,
  updateInventory,
  generateInventoryStatus,
} = require("./common/stock");
const { createInventoryHistory } = require("./common/inventory_history");

/**
 * Update the inventory based on the provided parameters.
 *
 * @param {number} params.quantity - The quantity to update the inventory with.
 * @param {number} params.productId - The product id of the inventory to update.
 * @returns {Object} - An object containing the updated inventory and the inventory history.
 * @throws {Error} - If the inventory is not found.
 */
const updateInventoryForCustomerService = async ({ quantity, productId }) => {
  const error = new Error();

  if (!productId || !quantity) {
    error.message = "bad request";
    error.status = 400;
    throw error;
  }

  // Get the inventory by product id
  const isInventoryExist = await getInventoryByKey({
    name: "productId",
    value: productId,
  });

  if (!isInventoryExist) {
    error.message = "Inventory not found";
    error.status = 404;
    throw error;
  }

  // Check if the inventory is out of stock
  if (isInventoryExist.status === ENUM.InventoryStatus["OUT_OF_STOCK"]) {
    error.message =
      "Product is out of stock. Please reduce the quantity or try again later.";
    error.status = 410;
    throw error;
  }

  // Update Inventory Quantity and Status
  const newQuantity = isInventoryExist.quantity - quantity; // Deduct the inventory quantity
  const newStatus = generateInventoryStatus({ quantity: newQuantity });

  
  // Deduct the inventory quantity
  const updatedInventory = await updateInventory({
    key: {
      name: "productId",
      value: productId,
    },
    productId: productId,
    quantity: newQuantity,
    sku: isInventoryExist.sku,
    status: newStatus,
  });

  return {
    current_inventory: updatedInventory,
  };
};

module.exports = updateInventoryForCustomerService;
