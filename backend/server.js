const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
var cookieSession = require('cookie-session')

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const corsConfig = {
  origin:"https://group7-deployment.vercel.app", // frontend URL (ReactJS)
  credentials: true,
};
app.use(cors(corsConfig));
// app.options("*", cors(corsConfig));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  // Cookie Options
  maxAge: 2 * 60 * 60 * 1000 // 24 hours
}))
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection Success ");
});
app.get("/", (req, res) => {
  res.status(201).json({ message: "Connected to Backend!" });
});
const donorRouter = require("./routes/donors.js");
app.use("/Donor", donorRouter);

const bloodBankRouter = require("./routes/bloodBanks.js");
app.use("/bloodBank", bloodBankRouter);

const hospitalRouter = require("./routes/hospitals.js");
app.use("/hospital", hospitalRouter);

const adminRouter = require("./routes/admins.js");
app.use("/admin", adminRouter);
