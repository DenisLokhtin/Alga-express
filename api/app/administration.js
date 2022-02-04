const mongoose = require('mongoose');
const express = require('express');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Payment = require("../models/Payment");
const PaymentMove = require("../models/paymentMove");
const User = require("../models/User");

const router = express.Router();

router.get('/', auth, permit('admin'), async (req, res) => {
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
            .skip(page * limit);

        res.send({totalElements: size.length, data: response});
    } catch (e) {
        res.send(403).send({error: e.response.data.error});
    }
});

router.post('/', auth, async (req, res) => {
    const pay = Number(req.body.pay);
    try {
        const checkPayment = await Payment.findById(req.body.id)
            .populate('user', 'name');
        const userPayment = await User.findById(checkPayment.user._id);
        if (checkPayment) {
            const confirm = await Payment.findByIdAndUpdate(req.body.id, {status: true});

            if (confirm) {
                const permitData = {
                    replenish: pay,
                    userPayment: req.body.id,
                    permitPayment: req.user._id,
                    lastBalance: userPayment.balance,
                    status: 'REPLENISH',
                };

                const paySave = new PaymentMove(permitData);
                await paySave.save();

                await User.findByIdAndUpdate(userPayment, {balance: userPayment.balance + pay});

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
