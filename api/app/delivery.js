const express = require("express");
const Delivery = require('../models/Delivery');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', auth, permit('admin'), async (req, res) => {
    try {
        const delivery = await Delivery.find({});
        res.send(delivery);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/', auth, permit('user'), async (req, res) => {
    try {
        const updatedDelivery = await Delivery.findOneAndUpdate({_id: req.params._id}, {
            completed: req.body.completed,
        });

        res.send(updatedDelivery);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/', auth, permit('user'), async (req, res) => {
    try {
        const deliveryData = {
            address: req.body.address,
            user: req.user._id,
            trackNumber: req.body.trackNumber,
        };

        const newDelivery = new Delivery(deliveryData);

        await newDelivery.save();
        return res.send(newDelivery);

    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
});

router.delete('/:trackNumber', auth, permit('user'), async (req, res) => {
    try {
        await Delivery.findOneAndDelete({trackNumber: req.params.trackNumber});
        res.send('Удалено');
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;