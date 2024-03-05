const CustomError = require("../utils/Error");
const getInventoryService = require("../services/getInventoryService");

const { trace,SpanStatusCode, } = require("@opentelemetry/api");

const getInventoryController = async (req, res, next) => {
  const tracer = trace.getTracer("getInventoryController");
  tracer.startActiveSpan("Get Inventory Controller 🍳", async (span) => {
    const traceId = span.spanContext().traceId;
    try {
      const history = req.query?.history;

      const key = {
        name: req.params?.skuId ? "sku" : "productId",
        value: req.params?.skuId || req.params?.productId,
      };
      const result = await getInventoryService(key, history);

      res.status(200).json({
        message: "Success",
        traceId,
        ...result,
        
      });

      span.setStatus({ code: SpanStatusCode.OK });
    } catch (err) {
      const error = CustomError.severError(err, err.status);
      next({traceId,...error});
      span.recordException(error);
      span.setStatus({ code: SpanStatusCode.ERROR });
    } finally {
      span.end();
    }
  });
};

module.exports = getInventoryController;
