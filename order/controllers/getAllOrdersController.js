const CustomError = require("../utils/Error");
const getAllOrdersService = require("../services/getAllOrdersService");

const getAllOrdersController = async (req, res, next) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (err) {
    next(CustomError.severError(err, err.status));
  }
};

module.exports = getAllOrdersController;
