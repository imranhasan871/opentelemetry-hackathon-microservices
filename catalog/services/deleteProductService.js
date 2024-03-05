const prisma = require("../utils/prisma");

/**
 * Deletes a product by its ID.
 *
 * @param {string} id - The ID of the product to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the deleted product object.
 * @throws {Error} - If the product ID is missing, or if the product is not found.
 */
const deleteProductService = async (id) => {
  if (!id) {
    const error = new Error("Product id is required");
    error.status = 400;
    throw error;
  }

  const existingProduct = await prisma.product.findFirst({
    where: {
      id: id,
    },
  
  })

  if (!existingProduct) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  const deletedProduct = await prisma.product.delete({
    where: {
      id: id,
    },
  });

  console.log(deletedProduct)

  return deletedProduct;
};

module.exports = deleteProductService;
