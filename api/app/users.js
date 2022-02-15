const express = require('express');
const User = require('../models/User');
const TariffGroup = require("../models/TariffGroup");
const permit = require("../middleware/permit");
const auth = require("../middleware/auth");


const router = express.Router();

router.get('/', auth, permit('admin'), async (req, res) => {
    try {
        const users = await User.find({role: 'user'})
            .select('name');
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', async (req, res) => {
    console.log('in post');
    try {
        const tariff = await TariffGroup.findOne({new: {$exists: true}});
        console.log(tariff);
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            phone: {number: req.body.phone},
            name: req.body.name,
            tariff: {
                usa: tariff.new.usa,
                turkey: tariff.new.turkey,
                china: tariff.new.china,
                chinaGround: tariff.new.chinaGround,
            },
        });

        user.generateToken();
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({message: 'Пожалуйста, введите корректный email-адрес или Пароль'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({message: 'Пожалуйста, введите корректный email-адрес или Пароль'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    user = await User.findOne({email: req.body.email})
        .select('token role name balance phone avatar');

    res.send(user);
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();

    await user.save({validateBeforeSave: false});

    return res.send(success);
});

module.exports = router;





















