const { context, trace, propagation } = require("@opentelemetry/api");

/**
 * Executes a callback function within a manually created span.
 *
 * @param {string} tracerName - The name of the tracer to use.
 * @param {string} spanName - The name of the span to create.
 * @param {function} cb - The callback function to execute within the span.
 * @returns {*} - The result of the callback function.
 */
const manualSpan = (tracerName, spanName, cb) => {
  let data;
  trace.getTracer(tracerName).startActiveSpan(spanName, (span) => {
    data = cb(span);
    span.end();
  });
  // console.log("data", data);
  return data;
};

const httpContextPropagation = (parentSpan, cb) => {
  let data;
  context.with(trace.setSpan(context.active(), parentSpan), () => {
    const carrier = {};
    propagation.inject(context.active(), carrier);
    data = cb(carrier);
  });

  return data;
};

module.exports = {
  manualSpan,
  httpContextPropagation,
};
