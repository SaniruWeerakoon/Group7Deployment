const router = require("express").Router();
let donation = require("../models/donation");

router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const type = req.body.type;
    const donationLocation = req.body.donationLocation;
    const date = req.body.date;
    const pints = req.body.pints;
    const reward = req.body.reward;
    const NIC = req.body.NIC;
    const donationUsername = req.body.donationUsername;
    const donationTelephone = req.body.donationTelephone;

    const newdonation = new donation({
      name,
      type,
      date,
      donationLocation,
      pints,
      reward,
      NIC,
      donationUsername,
      donationTelephone,
    });
    newdonation.save().then(()=>{
        res.json("donation added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    donation.find().then((donations)=>{
        res.json(donations)
    }).catch((err)=>{
        console.log(err)
    })
})



module.exports = router;