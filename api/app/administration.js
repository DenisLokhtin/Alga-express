const express = require('express');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Payment = require("../models/Payment");
const PaymentMove = require("../models/PaymentMove");
const User = require("../models/User");
const sendMail = require("../middleware/sendMail");
const TariffGroup = require("../models/TariffGroup");

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
        res.status(400).send({error: e});
    }
});

router.get('/tariff', auth, permit('admin'), async (req, res) => {
    try {
        const tariff = await TariffGroup.findOne();
        res.send(tariff);
    } catch (e) {
        res.status(500).send({error: e});
    }
});


router.post('/', auth, permit('admin'), async (req, res) => {
    let pay = Number(req.body.pay).toFixed(2);
    pay = Number(pay);

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
                    user: userPayment._id,
                    status: 'REPLENISH',
                };

                const paySave = new PaymentMove(permitData);
                await paySave.save();

                // sendMail('test@gmail.com', 'test', 'test body');
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
        res.status(400).send({error: e});
    }
});

router.post('/cash', auth, permit('admin'), async (req, res) => {
    let serializedPrice = req.body.price;

    if (serializedPrice.includes(',') && serializedPrice.includes('.')) {
        return res.status(400).send({
            errors: {price: {message: 'Введите корректную сумму оплаты'}},
        });
    }

    const dotMatching = req.body.price.match(/[.]/g) || [];

    if (dotMatching.length > 1) {
        return res.status(400).send({
            errors: {price: {message: 'Введите корректную сумму оплаты'}},
        });
    }

    if (/[a-zA-Z]/.test(serializedPrice)) {
        return res.status(400).send({
            errors: {price: {message: 'Введите корректную сумму оплаты'}},
        });
    }

    if (serializedPrice.includes(' ')) {
        return res.status(400).send({
            errors: {price: {message: 'Введите сумму без пробелов'}},
        });
    }

    const commaMatching = req.body.price.match(/,/g) || [];

    if (serializedPrice.indexOf(',') === 0 || serializedPrice.indexOf('.') === 0 || commaMatching.length > 1) {
        return res.status(400).send({
            errors: {price: {message: 'Введите корректную сумму оплаты'}},
        });
    } else if (req.body.price.indexOf(',') > 0) {
        serializedPrice = req.body.price.replace(/,/g, '.');
    }

    let price = Number(serializedPrice).toFixed(2);
    price = Number(price);

    try {
        const user = await User.findById(req.body.id);
        const payment = {
            permitPayment: req.user._id,
            replenish: price,
            lastBalance: user.balance,
            user: user._id,
            status: 'REPLENISH_CASH',
        }
        const newBalance = user.balance + price;
        await User.findByIdAndUpdate(req.body.id, {balance: newBalance.toFixed(2)});
        const paySave = new PaymentMove(payment);
        await paySave.save();

        res.send('Оплата прошла успешно');
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
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
                user: user._id,
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

            return res.send(paySave);
        } else {
            return res.status(203).send({error: 'Оплата не найдена'})
        }
    } catch (e) {
        res.status(400).send({error: e});

    }
});


module.exports = router;
