const CustomError = require("../utils/Error");
const getLineItemsService = require("../services/getLineItemsService");

const getLineItemsController = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const lineItems =await getLineItemsService(orderId);
    res.status(200).json(lineItems);
  } catch (err) {
    next(CustomError.severError(err, err.status));
  }
};

module.exports = getLineItemsController;
