const router = require("express").Router();
const getAllInventoryController = require("../controllers/getAllInventoryController");
const createInventoryController = require("../controllers/createInventoryController");
const getInventoryController = require("../controllers/getInventoryController");
const updateInventoryController = require("../controllers/updateInventoryController");
const updateInventoryForCustomerController = require("../controllers/updateInventoryForCustomerController");

// Stock Routes. here /:id refers to stock id
router.get("/inventories", getAllInventoryController);

router.get("/inventories/sku/:skuId", getInventoryController);
router.get("/inventories/product/:productId", getInventoryController);


// these routes only for admin to create and update the
router.post("/inventories", createInventoryController);
router.patch("/inventories/sku/:skuId", updateInventoryController);
router.patch("/inventories/product/:productId", updateInventoryController);

// this route for customer when they buy the product
router.patch("/inventories/product/:productId/customer", updateInventoryForCustomerController);


module.exports = router;
