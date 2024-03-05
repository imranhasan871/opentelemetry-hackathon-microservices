require("dotenv").config();
module.exports = {
  queue_url: process.env.AMQP_URL,
  user_service_url: process.env.USER_SERVICE_URL,
};
