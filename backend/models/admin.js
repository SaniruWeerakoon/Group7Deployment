const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type : String,
        required: true
    },
    password:{
        type: String,
        required:true
    }
})
adminSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
const admin = mongoose.model("admin",adminSchema);

module.exports = admin;
