const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const orderRoutes = require("../routes/orderRoutes");
const errorMiddleware = require("../middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("*"));

// Routes
app.use("/api/v1", orderRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Your server is healthy" });
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
