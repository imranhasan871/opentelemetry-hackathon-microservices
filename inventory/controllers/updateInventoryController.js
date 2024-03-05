const updateInventoryService = require("../services/updateInventoryService");
const CustomError = require("../utils/Error");

const joi = require("joi");
const updateInventoryController = async (req, res, next) => {
  try {
    const key = {
      name: req.params?.skuId ? "sku" : "productId",
      value: req.params?.skuId || req.params?.productId,
    };

    const stockSchema = joi
      .object({
        quantity: joi.number().optional(),
        key: joi
          .object({
            name: joi.string().valid("sku", "productId").required(),
            value: joi.string().required(),
          })
          .required(),
        sku: joi.string().optional(),
        status: joi.string().optional(),
      })
      .or("quantity", "sku", "status");

    const validation = stockSchema.validate({ ...req.body, key });

    if (validation.error) {
      const customError = CustomError.badRequest(validation.error);
      return next(customError);
    }

    const updatedStock = await updateInventoryService(validation.value);

    res.status(200).json({
      message: "Stock updated successfully",
      ...updatedStock,
    });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = updateInventoryController;
