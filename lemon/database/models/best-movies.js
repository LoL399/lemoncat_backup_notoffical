const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    name: { type: String },
    movie: { type: ObjectId, ref: "movies" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("best-movies", model);
