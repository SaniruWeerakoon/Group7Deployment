const router = require("express").Router();
let BloodBank = require("../models/bloodBank");
let pendingbloodBank=require("../models/pendingBloodbanks");
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("ndo9X4Sr6IJRPoPTHh5ogo9vpMWrTI0h"); //secret key
const { createSecretToken } = require("../Util/SecretToken");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.route("/add").post(
  (Signup = async (req, res, next) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const name = cryptr.encrypt(req.body.name);
      const telephone = cryptr.encrypt(parseInt(req.body.telephone));
      const district = cryptr.encrypt(req.body.district);
      const address = cryptr.encrypt(req.body.address);

      const existingUser = await pendingbloodBank.findOne({ username });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const user = await pendingbloodBank.create({
        username,
        password,
        name,
        telephone,
        district,
        address,
      });
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({
        message: "Blood Bank signed up successfully",
        success: true /*user*/,
      });
      next();
    } catch (error) {
      console.error(error);
    }
  })
);

router.route("/login").post(
  (Login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({ message: "All fields are required" });
      }
      const user = await BloodBank.findOne({ username });
      if (!user) {
        return res.json({ message: "Incorrect password or email" });
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.json({ message: "Incorrect password or email" });
      }
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "User logged in successfully", success: true });
      next();
    } catch (error) {
      console.error(error);
    }
  })
);

router.route("/verify").post(
  (hospitalVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false });
    }
    jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
      if (err) {
        return res.json({ status: false });
      } else {
        const bloodBank = await BloodBank.findById(data.id);
        if (bloodBank) {
          const name = cryptr.decrypt(bloodBank.name);
          const telephone = cryptr.decrypt(bloodBank.telephone);
          const district = cryptr.decrypt(bloodBank.district);
          const address = cryptr.decrypt(bloodBank.address);
          const user = {
            username: bloodBank.username,
            name,
            district,
            telephone,
            address,
          };
          return res.json({ status: true, user: user });
        } else return res.json({ status: false });
      }
    });
  })
);

router.route("/").get((req, res) => {
  //get BloodBank info
  BloodBank.find()
    .then((BloodBanks) => {
      res.json(BloodBanks);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
