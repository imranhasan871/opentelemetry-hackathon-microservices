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
 * @param {Object} params - The parameters for updating the inventory.
 * @param {string} params.key - The key for identifying the inventory.
 * @param {number} params.quantity - The quantity to update the inventory with.
 * @param {string} params.sku - The SKU of the inventory.
 * @param {string} params.status - The status of the inventory.
 * @returns {Object} - An object containing the updated inventory and the inventory history.
 * @throws {Error} - If the inventory is not found.
 */
const updateInventoryService = async ({ key, quantity, sku, status }) => {
  const error = new Error();

  if (!key.name || !key.value) {
    error.message = "bad request";
    error.status = 400;
    throw error;
  }

  console.log("key", key);

  // let newStatus = generateInventoryStatus({ status, quantity });

  const isInventoryExist = await getInventoryByKey({
    name: key.name,
    value: key.value,
  });

  if (!isInventoryExist) {
    error.message = "Inventory not found";
    error.status = 404;
    throw error;
  }

  console.log("isExist", isInventoryExist);

  const updatedQuantity = quantity
    ? isInventoryExist.quantity + quantity
    : isInventoryExist.quantity;

  // console.log("new", newStatus, updatedQuantity);
  if (updatedQuantity < 0) {
    error.message = "Invalid quantity";
    error.status = 400;
    throw error;
  }

  let newStatus;
  if (status) {
    newStatus = generateInventoryStatus({ status });
  } else {
    newStatus = generateInventoryStatus({ quantity: updatedQuantity });
  }

  const updatedInventory = await updateInventory({
    key,
    productId: isInventoryExist.productId,
    // if quantity is positive then add the quantity otherwise subtract the quantity
    quantity: updatedQuantity,
    sku: sku || isInventoryExist.sku,
    status: newStatus || isInventoryExist.status,
    // status: updatedQuantity > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  });

  console.log("updatedInventory", updatedInventory);

  const inventoryHistory = await createInventoryHistory({
    productId: updatedInventory.productId,
    sku: updatedInventory.sku,
    type:
      newStatus === "IN_STOCK"
        ? ENUM.StockHistoryType["ADDITION"]
        : ENUM.StockHistoryType["DEDUCTION"],
    last_stock: isInventoryExist.quantity,
    current_stock: updatedInventory.quantity,
  });

  return {
    updated_inventory: updatedInventory,
    inventory_history: inventoryHistory,
  };
};

module.exports = updateInventoryService;
