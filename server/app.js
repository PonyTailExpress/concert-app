const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config(); // To load environment variables

const Concert = require("./models/Concert");
const Artist = require("./models/Artist");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
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

// CRUD operations for Concerts

app.post("/concerts", async (req, res) => {
  try {
    // Use await for the create operation
    const concert = await Concert.create(req.body);
    res.status(201).json(concert);
  } catch (err) {
    console.error("Error creating concert:", err); // Log the error
    res
      .status(400)
      .json({ message: "Error creating concert", error: err.message });
  }
});

app.get("/concerts", async (req, res) => {
  try {
    const concerts = await Concert.find(); // Fetch all concerts from MongoDB
    res.status(200).json(concerts); // Send the retrieved concerts as JSON response
  } catch (err) {
    console.error("Error fetching concerts:", err); // Log any errors
    res
      .status(500)
      .json({ message: "Error fetching concerts", error: err.message });
  }
});

app.get("/concerts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const concert = await Concert.findById(id); // Fetch all concerts from MongoDB
    res.status(200).json(concert); // Send the retrieved concerts as JSON response
  } catch (err) {
    console.error("Error fetching concert :", err); // Log any errors
    res
      .status(500)
      .json({ message: "Error fetching concert", error: err.message });
  }
});

app.put("/concerts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const concert = await Concert.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!concert) {
      return res.status(404).json({ message: "Concert not found" });
    }

    res.status(200).json(concert);
  } catch (err) {
    console.error("Error updating concert:", err);
    res
      .status(500)
      .json({ message: "Error updating concert", error: err.message });
  }
});

app.delete("/concerts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const concert = await Concert.findByIdAndDelete(id);

    if (!concert) {
      return res.status(404).json({ message: "Concert not found" });
    }

    res.status(200).json({ message: "Concert deleted successfully", concert });
  } catch (err) {
    console.error("Error deleting concert:", err);
    res
      .status(500)
      .json({ message: "Error deleting concert", error: err.message });
  }
});

// CRUD operations for Artists

app.post("/artists", async (req, res) => {
  try {
    // Use await for the create operation
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    console.error("Error creating artists:", err); // Log the error
    res
      .status(400)
      .json({ message: "Error creating artists", error: err.message });
  }
});

app.get("/artists", async (req, res) => {
  try {
    const artist = await Artist.find(); // Fetch all concerts from MongoDB
    res.status(200).json(artist); // Send the retrieved concerts as JSON response
  } catch (err) {
    console.error("Error fetching artists:", err); // Log any errors
    res
      .status(500)
      .json({ message: "Error fetching artists", error: err.message });
  }
});

app.get("/artists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findById(id); // Fetch all concerts from MongoDB
    res.status(200).json(artist); // Send the retrieved concerts as JSON response
  } catch (err) {
    console.error("Error fetching artists :", err); // Log any errors
    res
      .status(500)
      .json({ message: "Error fetching artists", error: err.message });
  }
});

app.put("/artists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.error("Error updating artist:", err);
    res
      .status(500)
      .json({ message: "Error updating artist", error: err.message });
  }
});

app.delete("/artists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findByIdAndDelete(id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json({ message: "Artist deleted successfully", artist });
  } catch (err) {
    console.error("Error deleting Artist:", err);
    res
      .status(500)
      .json({ message: "Error deleting Artist", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
