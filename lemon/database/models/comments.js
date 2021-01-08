const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    byUser: { type: ObjectId, ref: "users" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", model);
