const router = require("express").Router();
let hospital = require("../models/hospital");
let pendinghospital = require("../models/pendingHospitals");
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
      const existingUser = await pendinghospital.findOne({ username });
      const existingUser_2 = await hospital.findOne({ username });
      if (existingUser || existingUser_2) {
        return res.json({ message: "User already exists" });
      }
      const name = cryptr.encrypt(req.body.name);
      const telephone = cryptr.encrypt(parseInt(req.body.telephone));
      const district = cryptr.encrypt(req.body.district);
      const address = cryptr.encrypt(req.body.address);

      const user = await pendinghospital.create({
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
        message: "Hospital signed up successfully",
        success: true /*user*/,
      });
      next();
    } catch (error) {
      console.error(error);
    }
  })
);

router.route("/").get((req, res) => {
  //get hospital info
  hospital
    .find()
    .then((hospitals) => {
      res.json(hospitals);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/login").post(
  (Login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({ message: "All fields are required" });
      }
      const user = await hospital.findOne({ username });
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
        sameSite: "none",
        secure: true,
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
        const Hospital = await hospital.findById(data.id);
        if (Hospital) {
          const name = cryptr.decrypt(Hospital.name);
          const telephone = cryptr.decrypt(Hospital.telephone);
          const district = cryptr.decrypt(Hospital.district);
          const address = cryptr.decrypt(Hospital.address);
          const user = {
            username: Hospital.username,
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


module.exports = router;
