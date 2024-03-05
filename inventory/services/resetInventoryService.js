const RedisClient = require("../utils/redis_client");
const redis = new RedisClient();
const prisma = require("../utils/prisma");

/**
 * Resets the quantity of products in the inventory based on the items in the Redis cart.
 *
 * @param {string} redisKey - The Redis key for the cart.
 * @returns {Promise<void>} - A Promise that resolves once the inventory is updated and the cart is cleared from Redis.
 */
const resetInventoryService = async (redisKey) => {
  const sessionId = redisKey.split(":")[1];
  const itemsKey = `items:${sessionId}`;
  const items = JSON.parse(await redis.getDataFromRedis(itemsKey));
  console.log(items);

  //   Todo: Reset the quantity of the product in the inventory.
  // Here we can use Queue to update the inventory in the background to avoid the unnecessary load on the inventory service.
  items.forEach(async (item) => {
    await prisma.inventory.update({
      where: {
        productId: item.productId,
      },
      data: {
        quantity: {
          increment: item.quantity,
        },
      },
    });
  });

  // Remove the cart and items from the redis
  redis.clearDataFromRedis(itemsKey);
};

module.exports = resetInventoryService;
