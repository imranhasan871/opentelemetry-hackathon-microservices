const router = require("express").Router();
const createOrderController = require("../controllers/createOrderController");
const getOrderByIdController = require("../controllers/getOrderByIdController");
const getAllOrdersController = require("../controllers/getAllOrdersController");
const updateOrderController = require("../controllers/updateOrderController");
const getLineItemsController = require("../controllers/getLineItemsController");


// Create Order
router.post("/orders", createOrderController);
// Get Order
router.get("/orders/:id", getOrderByIdController);
// Get All Orders
router.get("/orders", getAllOrdersController);
// Update order
router.patch("/orders/:id", updateOrderController);

// Get line items for order
router.get("/orders/:id/lineItems" , getLineItemsController)

module.exports = router;
