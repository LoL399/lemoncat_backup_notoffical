const mongoose = require("mongoose");

const model = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: { type: String },
    bornIn: { type: String },
    summary: { type: String },
    poster: { type: String },
    photos: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("persons", model);
