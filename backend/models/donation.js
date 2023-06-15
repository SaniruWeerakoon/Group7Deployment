const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  name: { type: String },
  date: {
    type: String,
  },
  pints: {
    type: Number,
  },
  donationLocation: {
    type: String,
  },
  type: {
    type: String,
  },
  reward: {
    type: String,
  },
  NIC: {
    type: Number,
  },
  donationTelephone: {
    type: String,
  },
  donationUsername: {
    type: String,
  },
});

const donation = mongoose.model("donation", donationSchema);

module.exports = donation;