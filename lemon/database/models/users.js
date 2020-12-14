const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String },
    role: { type: String, default: "user" },
    status: { type: Boolean, default: true },
    review: [{ type: ObjectId, ref: "reviews" }],
    news: [{ type: ObjectId, ref: "news" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", model);
