const { ValidationError } = require("joi");
const CustomError = require("../utils/Error");
const config = require("../config/config");
const errorMiddleware = (err, req, res, next) => {
  let error = {
    status: err.status ? err.status : 501,
    message:
      config.node_env === "development" ? err.message : "Something went wrong!",
    traceId: err.traceId,
  };
  if (err instanceof CustomError) {
    error = {
      ...error,
    };
  }
  if (err instanceof ValidationError) {
    error = {
      ...error,
      status: 422,
    };
  }

  res.status(error.status).json(error);
};

module.exports = errorMiddleware;
