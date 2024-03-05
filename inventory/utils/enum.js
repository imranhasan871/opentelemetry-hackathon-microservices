const ENUM = Object.freeze({
  StockHistoryType: {
    ADDITION: "ADDITION",
    DEDUCTION: "DEDUCTION",
    SOLD: "SOLD",
  },
  InventoryStatus: {
    OUT_OF_STOCK: "OUT_OF_STOCK",
    IN_STOCK: "IN_STOCK",
  },
  lowStockSize: 0,
});

module.exports = ENUM;
