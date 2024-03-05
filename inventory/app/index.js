const express = require("express");
const cors = require("cors");
const inventoryRoutes = require("../routes/inventoryRoutes");
const errorMiddleware=require("../middlewares/errorMiddleware")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("*"));

// Routes
app.use("/api/v1", inventoryRoutes);

// Health check
app.get("/health",(req,res)=>{
  res.status(200).json({message:"Your server is healthy"})
})


// Global error handler
app.use(errorMiddleware)

module.exports= app

