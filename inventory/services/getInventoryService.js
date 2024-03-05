const prisma = require("../utils/prisma");
const { getInventoryHistory } = require("./common/inventory_history");
const { getInventoryByKey } = require("./common/stock");

/**
 * Retrieves stock information by ID.
 *
 * @param {Object} key - The key object containing the name and value of the key.
 * @param {string} key.name - The name of the key.
 * @param {string} key.value - The value of the key.
 * @param {string} history - A flag indicating whether to include stock history.
 * @returns {Object|null} - The stock object and its history, or null if not found.
 */
const getInventoryService = async (key, history) => {
  const error = new Error();

  if (!key.name || !key.value) {
    error.message = "bad request";
    error.status = 400;
    throw error;
  }

  const inventory = await getInventoryByKey({
    name: key.name,
    value: key.value,
  });
  console.log("inveotory", inventory);


  if (!inventory) {
    error.message = "Inventory not found";
    error.status = 404;
    throw error;
  }

  console.log("key", key);

  let inventoryHistory;
  if (history === "true") {
    inventoryHistory = await getInventoryHistory({
      name: key.name,
      value: key.value,
    });
  } else {
    inventoryHistory = undefined;
  }

  return {
    inventory,
    inventoryHistory,
  };
};

module.exports = getInventoryService;
