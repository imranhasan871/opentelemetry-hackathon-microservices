const express = require("express");
const cors = require("cors");
const userRoutes = require("../routes/userRoutes");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { propagation, trace, context } = require("@opentelemetry/api");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("*"));

// Routes
app.use("/api/v1", userRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Your server is healthy" });
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
