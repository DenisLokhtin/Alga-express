const express = require("express");
const Delivery = require('../models/Delivery');
const Package = require('../models/Package');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.put('/:id', auth, permit('user', 'admin', 'warehouseman', 'superAdmin'), async (req, res) => {
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, {
            completed: req.body.completed,
        });

        if (!updatedDelivery) return res.status(404).send({message: 'Доставка не найдена!'});

        res.send({message: 'Посылка доставлена!'});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/', auth, permit('user', 'admin', 'warehouseman', 'superAdmin'), async (req, res) => {
    try {
        const deliveryData = {
            address: req.body.address,
        };

        const newDelivery = new Delivery(deliveryData);

        const deliveryId = await newDelivery.save();

        const package = await Package.findById(req.query.package);

        if (package.delivery) return res.status(400).send({message: "У данной посылки доставка уже оформлена!"})

        const deliveryBinding = await Package.findByIdAndUpdate(req.query.package, {delivery: deliveryId._id})

        if (!deliveryBinding) return res.status(404).send({message: "Посылка не найдена"});

        res.send({message: 'Доставка оформлена!'});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;