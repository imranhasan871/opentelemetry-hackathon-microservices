const ENUM = Object.freeze({
  transactionType: {
    ADDITION: "ADDITION",
    DEDUCTION: "DEDUCTION",
  },
  stockStatus: {
    "OUT_OF_STOCK": "OUT OF STOCK",
    "IN_STOCK": "IN STOCK",
  },
  lowStockSize: 0,
});

module.exports = ENUM;
