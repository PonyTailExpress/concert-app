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
});

module.exports = model("User", userSchema);