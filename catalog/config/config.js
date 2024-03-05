const dotenv = require("dotenv");
dotenv.config();

const pkg = require("../package.json");

module.exports = {
  serviceName: pkg.name,
  serviceVersion: pkg.version,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  user_service_url: process.env.USER_SERVICE_URL,
  mail_service_url: process.env.MAIL_SERVICE_URL,
  auth_service_url: process.env.AUTH_SERVICE_URL,
  email_from: process.env.EMAIL_FROM,
  amqp_url: process.env.AMQP_URL,
};
