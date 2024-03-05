const joi = require("joi");
const updateOrderService = require("../services/updateOrderService");
const CustomError = require("../utils/Error");
const updateOrderController = async (req, res, next) => {
  try {
    const orderSchema = joi.object({
      status: joi.string().required(),
      id: joi.string().required(),
    });

    const { error, value } = orderSchema.validate({
      ...req.body,
      ...req.params,
    });

    if (error) {
      return next(CustomError.badRequest(error, 400));
    }

    const updatedOrder = await updateOrderService(value);

    res.status(200).json({
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (err) {
    next(CustomError.serverError(err, err.status));
  }
};

module.exports = updateOrderController;
