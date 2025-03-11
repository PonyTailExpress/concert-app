const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const concertSchema = new Schema({
  venue: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    unique: true,
    required: true,
  },
  image_url: {
    type: String,
  },
  artists: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    //required: true,
  },
});

module.exports = model("Concert", concertSchema);
