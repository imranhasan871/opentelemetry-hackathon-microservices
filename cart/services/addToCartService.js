const axios = require("axios");
const RedisClient = require("../utils/redis_client");
const redis = new RedisClient();

/**
 * Adds a product to the user's cart.
 *
 * @param {Object} options - The options for adding a product to the cart.
 * @param {string} options.sessionId - The session ID of the user.
 * @param {string} options.productId - The ID of the product to add to the cart.
 * @param {number} options.quantity - The quantity of the product to add to the cart.
 * @returns {Object} - The updated cart and session ID.
 * @throws {Error} - If the product is not available.
 */
const addToCartService = async ({ sessionId, productId, quantity }) => {
  const error = new Error();

  // Search inventory for product and check if quantity is available
  const { data: product } = await axios.get(
    `${process.env.INVENTORY_SERVICE_URL}/inventories/product/${productId}`
  );


  
  // check if product is available
  if (
    product.inventory.quantity < quantity ||
    product.inventory.status === "OUT_OF_STOCK" ||
    product.quantity < 0
  ) {
    error.message = "Product not available";
    error.status = 404;
    throw error;
  }

  // Add to cart

  const cartKey = `cart:${sessionId}`;

  const isCartExist = await redis.getDataFromRedis(cartKey);

  /* This code block is responsible for updating the cart items. */
  let items;
  if (isCartExist) {
    items = JSON.parse(isCartExist);
    const index = items.findIndex((item) => item.productId === productId);
    // If product already exist in cart then update the quantity otherwise add new product to cart
    if (index !== -1) {
      items[index].quantity =
        parseInt(items[index].quantity) + parseInt(quantity);
    } else {
      items.push({
        productId,
        quantity: quantity,
        price: product.inventory.price,
      });
    }
  }

  if (!items) {
    items = [{ productId, quantity, price: product.inventory.price }];
  }

  // Add to cart
  redis.addDataToRedis({
    key: cartKey,
    expiry: process.env.REDIS_EXPIRATION_TIME,
    data: JSON.stringify(items),
  });

  // Save items so that we can search it letter
  redis.addDataToRedis({
    key: `items:${sessionId}`,
    data: JSON.stringify(items),
  });

  // Publish cart_item_added event to notify other services
  redis.produce(
    "cart_item_added",
    JSON.stringify({ sessionId, productId, quantity })
  );

  return {
    cart: items,
    sessionId,
  }
};

module.exports = addToCartService;
