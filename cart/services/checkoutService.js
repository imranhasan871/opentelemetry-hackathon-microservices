const axios = require("axios");
const RedisClient = require("../utils/redis_client");
const redis = new RedisClient();

/**
 * Performs the checkout process for a user's cart.
 *
 * @param {string} sessionId - The session ID of the user.
 * @param {object} user - The user details, including userId, email, name, and address.
 * @returns {object} - The response from the order service.
 * @throws {Error} - If the cart is not found.
 */
const checkoutService = async (sessionId, user) => {
  const error = new Error("");

  // Get cart items from redis
  const cartItems = JSON.parse(
    await redis.getDataFromRedis(`cart:${sessionId}`)
  );

  // If cart not found, throw error
  if (!cartItems) {
    error.status = 404;
    error.message = "Cart not found";
    throw error;
  }

  // Todo:  Call order service to place order
  // user details ={userId, email,name,address}
  // cartItems = [{productId,quantity, price}]
  const orderServiceResponse = await axios.post(
    `${process.env.ORDER_SERVICE_URL}/orders`,
    {
      userId: user.userId,
      email: user.email,
      name: user.name,
      cartItems,
    }
  );

  if (orderServiceResponse.status == 201) {
    console.log("clearing cart");

    // Clear cart and cart items from redis
    redis.clearDataFromRedis(`cart:${sessionId}`);
    redis.clearDataFromRedis(`items:${sessionId}`);
  }

  console.log("data", orderServiceResponse.data);

  return { ...orderServiceResponse.data };
};

module.exports = checkoutService;
