const prisma = require("../utils/prisma");
const axios = require("axios");

/**
 * Creates an order with the given order details.
 * 
 * @param {Object} orderDetails - The details of the order.
 * @param {string} orderDetails.userId - The ID of the user placing the order.
 * @param {string} orderDetails.name - The name of the user placing the order.
 * @param {string} orderDetails.email - The email of the user placing the order.
 * @param {Array} orderDetails.cartItems - The items in the user's cart.
 * @param {string} orderDetails.cartItems.productId - The ID of the product.
 * @param {number} orderDetails.cartItems.quantity - The quantity of the product.
 * @param {number} orderDetails.cartItems.price - The price of the product.
 * @returns {Object} - The created order.
 */
const createOrderService = async (orderDetails) => {
  // create line items for each product in cartItems
  let lineItems = [];

  // create subtotal, tax, discount, grandTotal.
  let subtotal = 0;
  let tax = 0;
  let discount = 0;
  let grandTotal = 0;

  orderDetails.cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
    lineItems.push({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    });
  });

  tax = subtotal * 0.18; // 18% tax on subtotal
  grandTotal = subtotal + tax - discount; // discount is 0 for now

  // create order
  const order = await prisma.order.create({
    data: {
      userId: orderDetails.userId,
      name: orderDetails.name,
      email: orderDetails.email,
      subtotal,
      tax,
      discount,
      grandTotal: grandTotal,
    },
  });

  // update order id in line items
  lineItems = lineItems.map((item) => {
    return {
      ...item,
      orderId: order.id,
    };
  });

  // create line item for each product in cartItems
  await prisma.lineItem.createMany({
    data: lineItems,
  });

  // Todo: you can publish the order created event to a message broker so that other services can listen to it and perform their tasks. for now we will make an api call to send email to user.
  // 1. Send email to user
  const mailData = {
    to: orderDetails.email,
    from: "order@stacklearner.com",
    subject: "Order created",
    body: "We have received your order. We will notify you once it is shipped. Thank you for shopping with us.",
  };
  await axios.post(`${process.env.MAIL_SERVICE_URL}/mails/send`, mailData);
  // 2. Send email to admin

  return order;
};

module.exports = createOrderService;
