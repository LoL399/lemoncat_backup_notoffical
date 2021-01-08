const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    summary: { type: String },
    poster: { type: String },
    trailer: [{ type: String }],
    studio: { type: String },
    rating: { type: String },
    genres: [{ type: String }],
    theater: { type: String, default: null },
    images: [{ type: String }],
    lemonScore: { type: Number, default: 0 },
    userScore: { type: Number, default: 0 },
    casts: [
      {
        person: { type: ObjectId, ref: "persons" },
        characterName: { type: String },
      },
    ],
    director: { type: ObjectId, ref: "persons" },
    writer: { type: ObjectId, ref: "persons" },
    status: { type: Boolean, default: true },
    hot: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("movies", model);
