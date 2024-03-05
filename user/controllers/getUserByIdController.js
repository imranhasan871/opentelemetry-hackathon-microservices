const CustomError = require("../utils/Error");
const getUserByKeyService = require("../services/getUserByKeyService");
const { trace } = require("@opentelemetry/api");
const { manualSpan } = require("../utils/otel");
const getUserByIdController = async (req, res, next) => {
  const tracer = trace.getTracer("getUserByIdController");
  tracer.startActiveSpan("Get-User-By-Id-Controller 🍳", async (span) => {
    try {
      const key = {
        name: req.params?.id ? "id" : "email",
        value: req.params?.id ? req.params.id : req.params.email,
      };

      if (!key.name) {
        const error = CustomError.badRequest("Bad Request", 400);
        next(error);
      }

      // Get user
      const user = await manualSpan(
        "Get User By Id Controller",
        "Get User By Id Service 🍳",
        () => {
          return getUserByKeyService(key);
        }
      );

      res.status(200).json({ message: "Success", user: user });
    } catch (err) {
      const error = CustomError.severError(err.message, err.status);
      next(error);
    } finally {
      span.end();
    }

    // span.end()
  });
};

module.exports = getUserByIdController;
