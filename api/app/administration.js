const mongoose = require('mongoose');
const express = require('express');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Payment = require("../models/Payment");
const PaymentMove = require("../models/PaymentMove");
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

router.post('/', auth, permit('admin'), async (req, res) => {
    const pay = Number(req.body.pay);
    try {
        const checkPayment = await Payment.findById(req.body.id)
            .populate('user', 'name');
        const userPayment = await User.findById(checkPayment.user._id);
        if (checkPayment) {
            const confirm = await Payment.findByIdAndUpdate(req.body.id, {status: true, amount: pay});

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
            res.status(403).send({error: 'Оплата не найдена'});
        }


    } catch (e) {
        console.error(e);
        res.status(403).send({error: 'Оплата не найдена'});

    }
});

router.put('/:id', auth, permit('admin'), async (req, res) => {
    const payId = req.params.id;
    let pay = 0;
    if (req.body.pay) {
        pay = req.body.pay;
    }
    try {
        const userPaymentMove = await PaymentMove.findById(payId)
            .populate({path: 'userPayment', select: 'user'});
        const userPayment = await Payment.findById(userPaymentMove.userPayment)
            .populate('user', 'name');
        const user = await User.findById(userPayment.user);


        if (pay > 0) {
            const permitData = {
                replenish: pay,
                userPayment: userPayment._id,
                permitPayment: req.user._id,
                lastBalance: user.balance,
                status: 'REPLENISH_EDIT',
            };

            await User.findByIdAndUpdate(userPayment.user._id, {balance: user.balance - userPayment.amount + pay});

            userPaymentMove.status = 'CANCELED';
            await userPaymentMove.save();

            userPayment.amount = pay;
            await userPayment.save();

            const paySave = new PaymentMove(permitData);
            await paySave.save();

            return  res.send(paySave);
        } else {
            return  res.status(203).send({error: 'Оплата не найдена'})
        }
    } catch (e) {
        res.status(403).send({error: 'Оплата не найдена'});
    }
});


module.exports = router;
