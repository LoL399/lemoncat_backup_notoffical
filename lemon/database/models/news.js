const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const model = new mongoose.Schema(
  {
    
    poster: { type: String, default: null },
    byUser: { type: ObjectId, ref: "users" },
    name: { type: String },
    content: { type: String, required: true },
    category: { type: String },
    like: [{ type: ObjectId, ref: "users" }],
    active: { type: Boolean, default: true },
    tag: [{ type: String }],
    comment: [
      {
        comment: { type: ObjectId, ref: "comments" },
        like: [{ type: ObjectId, ref: "users" }],
        subComment: [{ type: ObjectId, ref: "comments" }],
      },
    ],
    hot: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("news", model);
