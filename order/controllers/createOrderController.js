const CustomError = require("../utils/Error");
const joi = require("joi");

const createOrderService = require("../services/createOrderService");
const createOrderController = async (req, res, next) => {
  try {
    const orderSchema = joi.object({
      userId: joi.string().required(),
      name: joi.string().required(),
      email: joi.string().email().required(),
      cartItems: joi
        .array()
        .items(
          joi.object({
            productId: joi.string().required(),
            quantity: joi.number().required(),
            price: joi.number().required(),
          })
        )
        .required(),
    });

    const { error, value } = orderSchema.validate(req.body);
    if (error) {
      return next(CustomError.badRequest(error));
    }

    const order = await createOrderService(value);
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = createOrderController;
