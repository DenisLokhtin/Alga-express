const express = require('express');
const TariffGroup = require("../models/TariffGroup");
const User = require("../models/User");
const permit = require("../middleware/permit");
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const currentTariffs = await TariffGroup.find();

        res.send(currentTariffs);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/', auth, permit('admin', 'superAdmin'), async (req, res) => {
    const newTariff = {};
    try {
        const tariff = await TariffGroup.findByIdAndUpdate(req.body.id, req.body.data, {new: true});
        const findUsers = await User.find({group: req.body.value.toUpperCase()});

        Object.keys(findUsers[0].tariff).forEach(key => {
            newTariff[key] = tariff[key];
        });
        findUsers.map(async user => {
            await User.findByIdAndUpdate(user._id, {tariff: newTariff});
        });

        if (tariff) {
            const sendData = await TariffGroup.find();
            return res.send(sendData);
        } else {
            res.status(500).send({error: 'Какая-то ошибка'});
        }
    } catch (e) {
        res.status(500).send({error: e});
    }
});


module.exports = router;





















