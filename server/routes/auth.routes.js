const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const User = require("../models/User");
const Concert = require("../models/Concert");
const Artist = require("../models/Artist");

const router = express.Router();

const saltRounds = 10;

//
// POST /auth/signup  (Register)
//
router.post("/signup", (req, res, next) => {
  const { name, email, password, role } = req.body;
  console.log("req.body", req.body);

  // Check if the email or password or name is provided as an empty string
  if (!name || !email || !password) {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If the email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = {
        name: name,
        email: email,
        password: hashedPassword,
        role: role || false,
      };

      // Create a new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create(newUser);
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // (we will not send the hash to the client)
      const { _id, name, email, role } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { _id, name, email, role };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log("Error trying to create an account...\n\n", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

//
// POST /auth/login  (Login)
//
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name, role: foundUser.role };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
        return;
      }
    })
    .catch((err) => {
      console.log("Error trying to login...\n\n", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// GET /auth/verify (Verify a JWT)

router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.json(req.payload);
});

router.patch("/concerts/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params; // ID of the concert to like
  const { userId } = req.body; // Get the user ID from the request

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicates
    if (!user.concertLikes.includes(id)) {
      user.concertLikes.push(id);
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

router.patch("/artists/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params; // ID of the artist to like
  const { userId } = req.body; // Get the user ID from the request

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicates
    if (!user.artistLikes.includes(id)) {
      user.artistLikes.push(id);
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

router.get("/likedconcerts/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params; // ID of the artist to like

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const concerts = await Concert.find({ _id: { $in: user.concertLikes } });
    if (!concerts) {
      return res.status(404).json({ message: "No concert is liked by you" });
    }

    res.status(200).json(concerts);
  } catch (err) {
    console.error("Error getting liked concerts by :", err);
    res
      .status(500)
      .json({ message: "Error finding liked concerts", error: err.message });
  }
});

router.get("/likedartists/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params; // ID of the artist to like

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const artists = await Artist.find({ _id: { $in: user.artistLikes } });
    if (!artists) {
      return res.status(404).json({ message: "No artist is liked by you" });
    }

    res.status(200).json(artists);
  } catch (err) {
    console.error("Error getting liked artists by user :", err);
    res
      .status(500)
      .json({ message: "Error finding liked artists", error: err.message });
  }
});

router.get("/createdconcerts/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const concerts = await Concert.find({ _id: { $in: user.createdConcerts } });
    if (!concerts) {
      return res.status(404).json({ message: "No concert is created by you" });
    }

    res.status(200).json(concerts);
  } catch (err) {
    console.error("Error getting created concerts by :", err);
    res
      .status(500)
      .json({ message: "Error finding created concerts", error: err.message });
  }
});

router.delete("/user/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
});

module.exports = router;
