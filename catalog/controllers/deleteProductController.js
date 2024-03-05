const deleteProductService = require("../services/deleteProductService");
const CustomError = require("../utils/Error");


const deleteProductController = async (req, res, next) => {
  try {
    
    const id = req.params.id;
    const deletedProduct = await deleteProductService(id);

    res.status(200).json({ message: "Success", product: deletedProduct });
  } catch (err) {
    const error=CustomError.severError(err,err.status)
    next(error)
  }
};

module.exports = deleteProductController;
