const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 7000;
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connection established successfully");
});
const adminRouter = require("./apps/admin/routes/routes");
const userRouter = require("./apps/user/routes/routes");
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
