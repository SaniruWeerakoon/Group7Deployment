const router = require("express").Router();
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../Util/SecretToken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("ndo9X4Sr6IJRPoPTHh5ogo9vpMWrTI0h"); //secret key
require("dotenv").config();
const jwt = require("jsonwebtoken");

let admin = require("../models/admin");
const bloodBank = require("../models/bloodBank");
let pendingbloodBank = require("../models/pendingBloodbanks");
let hospital = require("../models/hospital");
let pendinghospital = require("../models/pendingHospitals");

router.route("/add").post(
  (Signup = async (req, res, next) => {
    ////////////////disable signup for admins
    return res.json({ success: false, message: "disabled" });
    /////////////////////////////////////////////
    try {
      const username = req.body.username;
      const password = req.body.password;
      const existingUser = await admin.findOne({ username });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const user = await admin.create({
        // create "makes a new instance of object and saves it" in one line
        username,
        password,
      });
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(201).json({
        message: "Admin signed up successfully",
        success: true /* user*/,
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
      const user = await admin.findOne({ username });
      if (!user) {
        return res.json({ message: "Incorrect password or email" });
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.json({ message: "Incorrect password or email" });
      }
      const token = createSecretToken(user._id);
      // console.log("login" + token);
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
  (adminVerification = (req, res) => {
    const token = req.cookies.token;
    // console.log("verify" + token);
    if (!token) {
      return res.json({ status: false });
    }
    jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
      if (err) {
        return res.json({ status: false });
      } else {
        const Admin = await admin.findById(data.id);
        if (Admin) {
          const pendingBanks = await pendingbloodBank.count();
          const pendingHosps = await pendinghospital.count();
          const Hosps = await hospital.count();
          const Banks = await bloodBank.count();
          const obj = {
            username: Admin.username,
            pendingBanks,
            pendingHosps,
            Hosps,
            Banks,
          };
          return res.json({ status: true, user: obj });
        } else return res.json({ status: false });
      }
    });
  })
);

router.route("/").get(async (req, res) => {
  const type=req.body.type;
  let pendingH = [];
  let pendingBB = [];
  let Hosps = [];
  let Banks = [];
  try {
    const pbloodbank = await pendingbloodBank.find();
    if (pbloodbank) {
      for (let i = 0; i < pbloodbank.length; i++) {
        const name = cryptr.decrypt(pbloodbank[i].name);
        const telephone = cryptr.decrypt(pbloodbank[i].telephone);
        const address = cryptr.decrypt(pbloodbank[i].address);
        pendingBB.push({
          username: pbloodbank[i].username,
          name,
          telephone,
          address,
        });
      }
    }
    const pHospital = await pendinghospital.find();
    if (pHospital) {
      for (let i = 0; i < pHospital.length; i++) {
        const name = cryptr.decrypt(pHospital[i].name);
        const telephone = cryptr.decrypt(pHospital[i].telephone);
        const address = cryptr.decrypt(pHospital[i].address);
        pendingH.push({
          username: pHospital[i].username,
          name,
          telephone,
          address,
        });
      }
    }
    const bloodbank = await bloodBank.find();
    if (bloodbank) {
      for (let i = 0; i < bloodbank.length; i++) {
        const name = cryptr.decrypt(bloodbank[i].name);
        const telephone = cryptr.decrypt(bloodbank[i].telephone);
        const address = cryptr.decrypt(bloodbank[i].address);
        Banks.push({
          username: bloodbank[i].username,
          name,
          telephone,
          address,
        });
      }
    }
    const Hospital = await hospital.find();
    if (Hospital) {
      for (let i = 0; i < Hospital.length; i++) {
        const name = cryptr.decrypt(Hospital[i].name);
        const telephone = cryptr.decrypt(Hospital[i].telephone);
        const address = cryptr.decrypt(Hospital[i].address);
        Hosps.push({
          username: Hospital[i].username,
          name,
          telephone,
          address,
        });
      }
    }
    res.json({ success: true, pendingBB, pendingH, Hosps, Banks });
  } catch (e) {
    res.json({ success: false });
  }
});

router.route("/AcceptOrDecline").post(
  (AcceptOrDecline = async (req, res) => {
    const UserID = req.body.username; //it means username of the hospital or bloodbank
    const choice = req.body.choice; //true is accept , false is decline
    const type = req.body.type; //types are Hospital or BloodBank
    let pUser = ""; //short for pending
    let user = "";
    if (type === "Hospital") {
      pUser = pendinghospital;
      user = hospital;
    } else if (type === "BloodBank") {
      pUser = pendingbloodBank;
      user = bloodBank;
    } else {
      return res.json({ success: false });
    }

    try {
      if (choice === "true" && UserID !== null) {
        //accept
        await pUser
          .findOne({ username: UserID })
          .then(async (data) => {
            // res.json(data);
            await user.create({
              username: data.username,
              password: data.password,
              name: data.name,
              district: data.district,
              telephone: data.telephone,
              address: data.address,
            });
            await pUser.findByIdAndDelete(data._id).then(() => {
              res.json({ success: true });
            });
          })
          .catch(() => {
            res.json({ success: false });
          });
      } else if (choice === "false" && UserID !== null) {
        //decline
        await pUser
          .findOneAndDelete({ username: UserID })
          .then(() => {
            res.json({ success: true });
          })
          .catch(() => {
            res.json({ success: false });
          });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error(error);
    }
  })
);
module.exports = router;
