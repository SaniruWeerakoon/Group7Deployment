const router = require("express").Router();
let BloodBankcount = require("../models/bloodBankcount");

router.route("/add").post((req,res)=>{
    const bloodCounts = req.body.bloodCounts;


    const newBloodBankcount = new BloodBankcount({
      bloodCounts
    })
    newBloodBankcount.save().then(()=>{
        res.json("Bloodcount added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{//get BloodBank info
    BloodBankcount.find().then((BloodBankscount)=>{
        res.json(BloodBankscount)
    }).catch((err)=>{
        console.log(err)
    })
})



module.exports = router;