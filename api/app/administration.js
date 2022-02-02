const mongoose = require('mongoose');
const express = require('express');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Payment = require("../models/Payment");
const PermitPayment = require("../models/PermitPaymentAdmin");

const router = express.Router();

router.get ('/', auth, permit('admin'), async (req, res) => {
    let page = 0;
    let limit = 10;

    if (req.query.page) {
        page = req.query.page;
    }

    if (req.query.limit) {
        limit = req.query.limit;
    }
    try {
        const size = await Payment.find({status: false});
        const response = await Payment.find({status: false})
            .populate('user', 'name')
            .select('image description date user')
            .limit(limit)
            .skip(page*limit);

        res.send({totalElements: size.length, data: response});
    } catch (e) {
        res.send(403).send({error: e.response.data.error});
    }
});

router.post('/', auth, async (req, res) => {
    console.log(req.body);
    const pay = Number(req.body.pay);
    try {
        const checkPayment = await Payment.findById(req.body.id)
            .populate('user', 'name');

        if (checkPayment) {
           const confirm = await Payment.findByIdAndUpdate(req.body.id, {status: true});

           if (confirm) {
               const permitData = {
                   check: req.body.pay,
                   userPayment: req.body.id,
               };

               const paySave = new PermitPayment(permitData);

               await paySave.save();

               return res.status(200).send({status: true});
           } else {
               return res.status(406).send({error: 'Ошибка оплаты'});
           }
        } else {
            return res.status(404).send({error: 'Оплата не найдена'});
        }


   } catch (e) {
        console.error(e);
   }
});


module.exports = router;
