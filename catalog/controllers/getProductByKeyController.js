const getProductByKeyService = require("../services/getProductByKeyService");
const CustomError = require("../utils/Error");

const getProductByKeyController = async (req, res, next) => {
  try {
    const key = {
      name: req.params?.id ? "id" : "sku",
      value: req.params?.id ? req.params.id : req.params.sku,
    };
    const product = await getProductByKeyService(key);

    if (!product) {
      const error = CustomError.notFound("Product not found!");
      return next(error);
    }

    res.status(200).json({ message: "Success", product });
  } catch (err) {
    console.log(err.status);
    const error = CustomError.severError(err, err.status);
    next(error);
  }
};

module.exports = getProductByKeyController;
