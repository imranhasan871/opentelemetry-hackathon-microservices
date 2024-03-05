const createProductService = require("../services/createProductService");
const CustomError = require("../utils/Error");

const joi = require("joi");

const createProductController = async (req, res, next) => {
  try {
    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required(), 
      price: joi.number().required(),
      status: joi.string().optional(),
    });

    const validation = schema.validate(req.body);

    if (validation?.error) {
      const error = CustomError.badRequest(validation.error);
      return next(error);
    }



    const product = await createProductService(validation.value);

    res.status(201).json({ message: "Success", ...product });

    // Todo: Call the inventory service to create a new inventory for the product
    // Request body: product_id, sku, quantity, status: IN_STOCK or OUT_OF_STOCK
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = createProductController;
