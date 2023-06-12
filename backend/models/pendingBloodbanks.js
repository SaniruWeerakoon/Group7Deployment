const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const pendingbloodBankSchema = new Schema({
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
});
pendingbloodBankSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});
const pendingbloodBank = mongoose.model("pendingbloodBank", pendingbloodBankSchema);

module.exports = pendingbloodBank;