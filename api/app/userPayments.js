const express = require("express");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Payment = require("../models/Payment");

const router= express.Router();

router.get ('/', auth, permit('user', 'superAdmin', 'admin'), async(req,res) => {
    try {
        const paymentLists = await Payment.find({user: req.user._id});
        if (paymentLists) {
            return res.send(paymentLists);
        } else {
            return res.status(409).send({error: 'пользователь не найден'});
        }
    } catch (e) {
        res.status(400).send({error:e});

    }
});

module.exports  = router