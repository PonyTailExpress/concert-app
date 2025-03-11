const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  artistImage: {
    type: String,
  },
  concerts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Concert",
      //required: true,
    },
  ],
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
