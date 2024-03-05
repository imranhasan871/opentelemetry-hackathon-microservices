const ENUM = require("../utils/enum");
const prisma = require("../utils/prisma");

/**
 * Updates a product with the given id and product data.
 *
 * @param {string} id - The id of the product to be updated.
 * @param {object} product - The updated product data.
 * @param {string} product.name - The new name of the product.
 * @param {number} product.price - The new price of the product.
 * @param {string} product.description - The new description of the product.
 * @param {string} product.status - The new status of the product.
 * @returns {Promise<object|null>} - The updated product object, or null if the product does not exist.
 * @throws {Error} - If the id is not provided, an error with status 400 is thrown.
 */
const updatedProductService = async (id, product) => {
  const error= new Error()
  if (!id) {
    error.message = "Product id is required";
    error.status = 400;
    throw error;
  }

  // Check if the product exists
  const existingProduct = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if(!existingProduct){
    return null
  }

  let newStatus = product?.status?.toUpperCase()?.trim();
  if (newStatus && ENUM.PRODUCT_STATUS[newStatus]) {
    newStatus = ENUM.PRODUCT_STATUS[newStatus];
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: product.name || existingProduct.name,
      price: product.price || existingProduct.price,
      description: product.description || existingProduct.description,
      status: newStatus || existingProduct.status,
    },
  });


  return updatedProduct;
};

module.exports = updatedProductService;
