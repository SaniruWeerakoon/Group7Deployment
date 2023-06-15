const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bloodBankSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  district: {
    type: String,
  },
  name: {
    type: String,
  },
  telephone: {
    type: String,
  },
  address: {
    type: String,
  },
  oPositive: {
    type: Number,
  },
  oNegative: {
    type: Number,
  },
  aPositive: {
    type: Number,
  },
  aNegative: {
    type: Number,
  },
  bPositive: {
    type: Number,
  },
  bNegative: {
    type: Number,
  },
  abPositive: {
    type: Number,
  },
  abNegative: {
    type: Number,
  },
});

const bloodBank = mongoose.model("bloodBank", bloodBankSchema);

module.exports = bloodBank;
