const CustomError = require("../utils/Error");
const getOrderByIdService = require("../services/getOrderByIdService");

const getOrderByIdController = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    // get order by id
    const order = await getOrderByIdService(orderId);
    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (err) {
    next(CustomError.severError(err, err.status));
  }
};


module.exports = getOrderByIdController;