/**
 * Formats an error message.
 *
 * @param {Error|string} err - The error object or error message to format.
 * @returns {string} The formatted error message.
 */
const formateError = (err) => {
    return err?.message ? err?.message : err;
  };

  
  /**
 * CustomError class represents a custom error object.
 * 
 * @class
 * @name CustomError
 * @constructor
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code associated with the error.
 * 
 * @example
 * const error = new CustomError("Error message", 404);
 * 
 * @example
 * const error = CustomError.notFound("Resource not found");
 * 
 * @example
 * const error = CustomError.unauthorized("Unauthorized access", 401);
 */
  class CustomError {
    constructor(message, status) {
      this.message = message;
      this.status = status;
    }
  
    static notFound(message = "Not Found!", status = 404) {
      return new CustomError(formateError(message), status);
    }
    static unauthorized(message = "Unauthorized", status = 401) {
      return new CustomError(formateError(message), status);
    }

    static badRequest(message = "Validation Error", status = 400) {
      return new CustomError(formateError(message), status);
    }
    static severError(message = "Internal Server Error", status = 500) {
      return new CustomError(formateError(message), status);
    }
  }
  
  module.exports = CustomError;
  