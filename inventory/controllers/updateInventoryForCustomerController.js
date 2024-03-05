const updateInventoryForCustomerService = require("../services/updateInventoryForCustomerService");
const CustomError = require("../utils/Error");

const joi = require("joi");
const updateInventoryForCustomerController = async (req, res, next) => {
  try {
    const stockSchema = joi.object({
      quantity: joi.number().optional(),
      productId: joi.string().required(),
    });

    const validation = stockSchema.validate({ ...req.body, ...req.params });

    if (validation.error) {
      const customError = CustomError.badRequest(validation.error);
      return next(customError);
    }

    const updatedStock = await updateInventoryForCustomerService(validation.value);

    res.status(200).json({
      message: "Stock updated successfully",
      ...updatedStock,
    });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = updateInventoryForCustomerController;
