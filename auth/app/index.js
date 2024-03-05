// const tracer = require("../tracer-copy2");

// const { sdk } = tracer("auth-service"); {}=

// const meter = require("../utils/meter")
// Create a histogram metric to record the duration of each request to the service.
// const calls = meter().createHistogram("http-calls");

const express = require("express");
const cors = require("cors");
const authRoutes = require("../routes/authRoutes");
const errorMiddleware = require("../middlewares/errorMiddleware");
const opentelemetry = require("@opentelemetry/api");

const app = express();

app.use((req, res, next) => {

  const tracer = opentelemetry.trace.getTracer("auth-service-tracer");
  const span = tracer.startSpan("auth-service-span");
  const traceId = span.spanContext().traceId;

  span.setAttribute("traceId 💖", traceId);
  span.setAttribute("http.method 💖", req.method);

  span.setAttribute("http.url 💖", req.url);

  opentelemetry.context.with(
    opentelemetry.trace.setSpan(opentelemetry.context.active(), span),
    () => {
      next();
    }
  );

});


// app.use((req, res, next) => {
//   const start = Date.now();

//   const parentSpan = opentelemetry.trace.getActiveSpan()

//   console.log("parentSpan", parentSpan.spanContext().traceId)
//   res.on('finish', () => {
//     const end = Date.now();
//     const responseTime = end - start;
//     console.log(`Response time: ${responseTime}ms`);
    
//     calls.record(responseTime, {
//       route: req.route?.path,
//       status: res.statusCode,
//       method: req.method,
//       responseTime: responseTime
//     });


//   });
//   next();
// });




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("*"));

// Routes
app.use("/api/v1", authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Your server is healthy" });
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
