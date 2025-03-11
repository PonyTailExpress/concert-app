const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  concertLikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Concert",
    },
  ],
  artistLikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
  ],
  createdConcerts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Concert",
    },
  ],
  role: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", userSchema);
