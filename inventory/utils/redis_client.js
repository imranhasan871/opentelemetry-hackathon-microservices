const { Redis } = require("ioredis");

class RedisClient {
  constructor() {
    this.redis = new Redis({
      host: "localhost",
      port: 6379,
      connectTimeout: 10000

    });
  }

  async consume({ channel, callback }) {
    await this.redis.subscribe(channel);
    this.redis.on("message", async (ch, message) => {
      if (channel === ch) {
        await callback(message);
      }
    });
  }

  async produce(channel, message) {
    this.redis.publish(channel, message);
  }

  // Keyspace notification for cart keys expired
  async keyspaceNotification({ channel = "__keyevent@0__:expired", callback }) {
    this.redis.config("SET", "notify-keyspace-events", "Ex");
    await this.redis.subscribe(channel);
    this.redis.on("message", async (ch, message) => {
      if (channel === ch) {
        await callback({ message, ch });
      }
    });
  }

  addDataToRedis = async ({
    key,
    expiry, // 15 minutes
    data,
  }) => {
    if (expiry) {
      return this.redis.setex(key, expiry, data);
    }

    return this.redis.set(key, data);
  };

  getDataFromRedis = async (key) => {
    return this.redis.getex(key);
  };

  clearDataFromRedis = async (key) => {
    return this.redis.del(key);
  };
}

module.exports = RedisClient;
