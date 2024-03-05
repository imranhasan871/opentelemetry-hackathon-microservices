const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cartRoutes = require("../routes/cartRoutes");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { trace, context } = require("@opentelemetry/api");

const app = express();

app.use((req, res, next) => {
  const tracer = trace.getTracer("cart-service-tracer");
  const span = tracer.startSpan("cart-service-span");
  const traceId = span.spanContext().traceId;

  span.setAttribute("traceId 💖", traceId);
  span.setAttribute("http.method 💖", req.method);

  span.setAttribute("http.url 💖", req.url);
  
  context.with(trace.setSpan(context.active(), span), () => {
    next();
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("*"));

// Routes
app.use("/api/v1", cartRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Your server is healthy ❤" });
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
