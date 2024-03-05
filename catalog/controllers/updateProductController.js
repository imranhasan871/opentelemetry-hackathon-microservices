const joi = require("joi");
const updatedProductService = require("../services/updatedProductService");
const CustomError = require("../utils/Error");

const updateProductController = async (req, res, next) => {
  try {
    // Check if the request body is valid
    const schema = joi
      .object({
        name: joi.string().optional(),
        description: joi.string().optional(),
        price: joi.number().optional(),
        status: joi.string().optional(),
        id: joi.string().required(),
      })
      .or("name", "description", "price");

    const validation = schema.validate({...req.body,...req.params});

    if (validation?.error) {
      const error = CustomError.badRequest(validation.error);
      return next(error);
    }

 

    // update product
    const updatedProduct = await updatedProductService(validation.value?.id, validation.value);

    if (!updatedProduct) {
      const error = CustomError.notFound("Product not found!");
      return next(error);
    }

    res.status(200).json({ message: "Success", product: updatedProduct });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = updateProductController;
