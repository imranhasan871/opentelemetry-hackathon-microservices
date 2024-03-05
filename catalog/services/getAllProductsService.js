const prisma = require("../utils/prisma");
/**
 * Retrieves all published products.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 */
const getAllProductsService = async () => {
  // Retrieve all published and In-stock products

  // Todo: If we want To know about product quantity we need to call productInventory service by it's id {{inventory_base_url}}/api/v1/inventories/product/:productId

  // Todo: Get all published products from the database
  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
    },
  });


  return products;
};

module.exports = getAllProductsService;
