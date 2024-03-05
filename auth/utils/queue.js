const amqp = require("amqplib");
const { queue_url } = require("../config/config");

const sendToQueue = async (queue, exchange,message) => {
  console.log("Start RabbitMQ Connection...", queue, message);
  const connection = await amqp.connect(queue_url);
  const channel = await connection.createChannel();

  // const exchange = "mail";
  await channel.assertExchange(exchange, "direct", { durable: true });

  channel.publish(exchange, queue, Buffer.from(message));
  console.log(`Sent to queue: ${queue}`);

  setTimeout(() => {
    connection.close();
    console.log("End RabbitMQ Connection...");
  }, 500);
};

module.exports = sendToQueue;
