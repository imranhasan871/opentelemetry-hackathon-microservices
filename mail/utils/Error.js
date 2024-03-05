const formateError = (err) => {
    return err?.message ? err?.message : err;
  };

/**
 * Formats an error message.
 *
 * @param {Error|string} err - The error message to format.
 * @returns {string} The formatted error message.
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
  