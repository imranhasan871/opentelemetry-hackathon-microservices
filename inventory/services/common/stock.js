const ENUM = require("../../utils/enum");
const prisma = require("../../utils/prisma");

/**
 * Creates a new stock entry in the inventory.
 *
 * @param {Object} stockData - The data for the new stock entry.
 * @param {string} stockData.productId - The ID of the product associated with the stock entry.
 * @param {number} stockData.quantity - The quantity of the product in stock.
 * @param {string} stockData.sku - The SKU (stock keeping unit) of the product.
 * @param {string} stockData.status - The status of the stock entry.
 * @returns {Promise<Object>} - A promise that resolves to the newly created stock entry.
 */
const createInventory = ({ productId, quantity, sku, status,price }) => {
  return prisma.inventory.create({
    data: {
      productId,
      sku,
      quantity,
      status,
      price
    },
  });
};

/**
 * Retrieves inventory by id sku and productId.
 *
 * @param {Object} params - The parameters for retrieving inventory.
 * @param {string} params.name - The name of the key to search by.
 * @param {string} params.value - The value of the key to search for.
 * @returns {Promise<Object|null>} - The inventory object if found, or null if not found.
 */
const getInventoryByKey = ({ name, value }) => {
  return prisma.inventory.findUnique({
    where: {
      [name]: value,
    },
  });
};

/**
 * Updates the inventory with the given parameters.
 *
 * @param {Object} params - The parameters for updating the inventory.
 * @param {string} params.key - The key is sku or productId.
 * @param {number} params.productId - The ID of the product associated with the inventory item.
 * @param {number} params.quantity - The quantity of the inventory item.
 * @param {string} params.sku - The SKU (stock keeping unit) of the inventory item.
 * @param {string} params.status - The status of the inventory item.
 * @returns {Promise<Object>} - A promise that resolves to the updated inventory item.
 */
const updateInventory = ({ key, productId, quantity, sku, status }) => {
  return prisma.inventory.update({
    where: {
      [key.name]: key.value,
    },
    data: {
      productId,
      sku,
      quantity,
      status,
    },
  });
};

/**
 * Generates the inventory status based on the given status and quantity.
 *
 * @param {string} status - The current status of the inventory.
 * @param {number} quantity - The quantity of the inventory.
 * @returns {string} - The generated inventory status.
 */
const generateInventoryStatus = ({ status, quantity }) => {
  let newStatus = status?.toUpperCase()?.trim();
  if (newStatus && ENUM.InventoryStatus[newStatus]) {
    newStatus = ENUM.InventoryStatus[newStatus];
  } else {
    newStatus =
      quantity > ENUM.lowStockSize
        ? ENUM.InventoryStatus["IN_STOCK"]
        : ENUM.InventoryStatus["OUT_OF_STOCK"];
  }

  return newStatus;
};

const getAllInventory = () => {
  return prisma.inventory.findMany();
};

module.exports = {
  createInventory,
  getInventoryByKey,
  updateInventory,
  generateInventoryStatus,
  getAllInventory,
};
