const express = require("express");
const Delivery = require('../models/Delivery');
const Package = require('../models/Package');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/:id', auth, permit('user', 'admin', 'warehouseman', 'superAdmin'), async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id);

        if (delivery) return res.status(404).send({message: "Доставка не найдена!"});

        res.send(delivery);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.put('/:id', auth, permit('user', 'admin', 'warehouseman', 'superAdmin'), async (req, res) => {
    try {
        let newData = {};

        if (req.body.address) newData.address = req.body.address;
        if (req.body.completed) newData.completed = req.body.completed;

        const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, newData, {new: true});

        if (!updatedDelivery) return res.status(404).send({message: 'Доставка не найдена!'});

        res.send({message: 'Адрес изменен!'});
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

        const findPackage = await Package.findById(req.query.package);

        if (findPackage.delivery) return res.status(400).send({message: "У данной посылки доставка уже оформлена!"})

        const deliveryBinding = await Package.findByIdAndUpdate(req.query.package, {delivery: deliveryId._id})

        if (!deliveryBinding) return res.status(404).send({message: "Посылка не найдена"});

        res.send({message: 'Доставка оформлена!'});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;