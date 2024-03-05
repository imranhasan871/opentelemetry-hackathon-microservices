const CustomError = require("../utils/Error");
const getAllInventoryService = require("../services/getAllInventoryService");

const getAllInventoryController = async (req, res, next) => {
  try {
    const stocks = await getAllInventoryService();

    res.status(200).json({
      message: "Success",
      stocks,
    });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = getAllInventoryController;
