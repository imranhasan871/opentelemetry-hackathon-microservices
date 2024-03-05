const router = require("express").Router();

const getAllProductsController = require("../controllers/getAllProductsController");
const getProductByKeyController = require("../controllers/getProductByKeyController");
const createProductController = require("../controllers/createProductController");
const updateProductController = require("../controllers/updateProductController");
const deleteProductController = require("../controllers/deleteProductController");

const authMiddleware = require("../middlewares/authMiddleware");

// Get all products
router.get("/products", getAllProductsController);

// Get product by ID
router.get("/products/:id", getProductByKeyController);
// Get product by SKU
router.get("/products/sku/:sku", getProductByKeyController);

// Create a product
router.post("/products", createProductController);

// Update a product
router.patch("/products/:id", updateProductController);

// Delete a product
router.delete("/products/:id", deleteProductController);

module.exports = router;
