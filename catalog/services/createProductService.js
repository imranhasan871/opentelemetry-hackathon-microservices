const prisma = require("../utils/prisma");
const CustomError = require("../utils/Error");
const generateSKU = require("../utils/sku");
const ENUM = require("../utils/enum");
const axios = require("axios");

/**
 * Creates a new product.
 *
 * @param {Object} params - The parameters for creating a product.
 * @param {string} params.name - The name of the product.
 * @param {number} params.price - The price of the product.
 * @param {string} params.description - The description of the product.
 * @param {string} params.status - The status of the product.
 * @throws {CustomError} If name, price, or description is missing.
 * @throws {CustomError} If the status is invalid.
 * @returns {Object} The created product.
 */
const createProductService = async ({ name, price, description, status }) => {
  const error = new CustomError();

  if (!name || !price || !description) {
    error.message = "name, price, and description are required";
    error.status = 400;
    throw error;
  }

  let newStatus = status?.toUpperCase()?.trim();
  if (newStatus && ENUM.PRODUCT_STATUS[newStatus]) {
    newStatus = ENUM.PRODUCT_STATUS[newStatus];
  }

  const sku = generateSKU(name);
  console.log("sku...............", sku)
  const createdProduct = await prisma.product.create({
    data: {
      sku,
      name,
      price,
      description,
      status: newStatus || ENUM.PRODUCT_STATUS["DRAFT"],
    },
  });

  // Todo: You can publish an event to a message broker so that other services can listen to it and perform their tasks. For now, we will make an API call to the inventory service to add the product to the inventory.
  const inventoryData = {
    productId: createdProduct.id,
    quantity: 1,
    price: createdProduct.price,
    sku: createdProduct.sku,
  };
  const inventory = await axios.post(
    `${process.env.INVENTORY_SERVICE_URL}/inventories`,
    inventoryData
  );

  console.log("Hello", inventory)


  return { product: createdProduct, inventory: { ...inventory?.data } };
};

module.exports = createProductService;
