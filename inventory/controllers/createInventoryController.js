const joi = require("joi");
const CustomError = require("../utils/Error");
const createInventoryService = require("../services/createInventoryService");

const createInventoryController = async (req, res, next) => {
  try {
    console.log(req.body)
    const stcokSchema = joi.object({
      productId: joi.string().required(),
      sku: joi.string().required(),
      quantity: joi.number().required(),
      price: joi.number().required(),
      status: joi.string().optional(),
    });

    const validate = stcokSchema.validate(req.body);
    if (validate.error) {
      const customError = CustomError.badRequest(validate.error);
      return next(customError);
    }

    const result = await createInventoryService(validate.value);

    res.status(201).json({
      message: "Stock created successfully",
      ...result,
    });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = createInventoryController;
