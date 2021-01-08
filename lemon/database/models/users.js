const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
var bcrypt = require('bcryptjs');
const model = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, default: "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" },
    role: { type: String, default: "user" },
    status: { type: Boolean, default: true },
    review: [{ type: ObjectId, ref: "reviews" }],
    news: [{ type: ObjectId, ref: "news" }],
  },
  { timestamps: true }
);

// model.pre("save",async(next)=>{
//   try {
//     const salt = await bcrypt.genSaltSync(10);
//     var hash = await bcrypt.hashSync(this.password, salt);
//     this.password = hash;
//     next()
//   } 
//   catch (error) {
//     next(error)
//   }
// })

// model.methods.checkPass = async (pass) =>{

//   return await bcrypt.compare(pass, this.password);

// }
module.exports = mongoose.model("users", model);
