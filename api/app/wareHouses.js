const express = require('express');
const Warehouse = require('../models/WareHouse');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const warehouses = await Warehouse.find({deleted: {$ne: true}});
        res.send(warehouses);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);

        if (warehouse) {
            res.send(warehouse);
        } else {
            res.status(404).send({error: 'Warehouse not found'});
        }
    } catch {
        res.sendStatus(500);
    }
});


router.post('/', auth, permit('admin'), async (req, res) => {
    try {
        const warehouseData = {
            country: req.body.country,
            info: req.body.info,
        };
        const warehouse = new Warehouse(warehouseData);
        await warehouse.save();
        res.send(warehouse);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndRemove(req.params.id);

        if (warehouse) {
            res.send(`Склад в '${warehouse.country} removed'`);
        } else {
            res.status(404).send({error: 'WareHouse not found'});
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(req.params.id, {
            country: req.body.country,
            info: req.body.info,
        }, {new: true, runValidators: true});
        res.send(updatedWarehouse);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;