const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // To load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Concert App API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
