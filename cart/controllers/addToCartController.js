const CustomError = require("../utils/Error");
const addToCartService = require("../services/addToCartService");

const joi = require("joi");
const generateSessionId = require("../utils/generateSessionId");
const { trace, context, SpanStatusCode } = require("@opentelemetry/api");

const { manualSpan } = require("../utils/otel");


const addToCartController = async (req, res, next) => {
  const parentSpan = trace.getSpan(context.active());
  parentSpan.updateName("Add to Cart Controller 🍳");
  const traceId = parentSpan.spanContext().traceId;

  try {
    const validation = manualSpan(
      "Validation-Tracer",
      "Validation-Span 🍳",
      (span) => {
        let sessionId = req.headers.sessionid;
        if (!sessionId) {
          sessionId = generateSessionId();
        }

        const schema = joi.object({
          sessionId: joi.string().required(),
          productId: joi.string().required(),
          quantity: joi.number().required(),
        });

        const { error, value } = schema.validate({
          ...req.body,
          sessionId,
        });
        if (error) {
          span.recordException(validate.error);
          span.setStatus({ code: SpanStatusCode.ERROR });

          // return next(CustomError.badRequest(error));
        }
        return { error, value };
      }
    );


    // Cart Service
    const cart = await manualSpan(
      "AddToCart Service Tracer",
      "AddToCart Service 🍳",
      (span) => {
        return addToCartService(validation.value,span);
      }
    );

    // const cart = await addToCartService(validation.value);

    // Add sessionId to response header
    res.setHeader("sessionid", cart.sessionId);
    res.status(201).json({ message: "Success", traceId });
    // Set user in span
    parentSpan.setAttribute("sessionid", validation.value.sessionId);
    parentSpan.setStatus({ code: SpanStatusCode.OK });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next({ traceId, ...error });

    parentSpan.recordException(error);
    parentSpan.setStatus({ code: SpanStatusCode.ERROR });
  } finally {
    parentSpan.end();
  }
};

module.exports = addToCartController;
