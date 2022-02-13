const express = require('express');
const Warehouse = require('../models/WareHouse');

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const warehouses = await Warehouse.find({deleted: {$ne : true}});
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


router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndRemove(req.params.id);

        if (warehouse) {
            res.send(`Склад в '${warehouse.country} removed'`);
        } else {
            res.status(404).send({error: 'WareHouse not found'});
        }

        // const warehouse = await Warehouse.findById(req.params.id);
        //
        // if (Object.keys(warehouse).length === 0) {
        //     return res.status(404).send({error: `Склад не найден.`});
        // } else {
        //     warehouse.deleted = true;
        //     await warehouse.save();
        //     // warehouse.deleteOne({_id: req.params.id});
        //     // await warehouse.save();
        //     console.log('delete success')
        //     return  res.send({message: `Склад в стране ${req.params.id} успешно удален.`})
        // }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(req.params.id, {
            country: req.body.country,
            info: req.body.info,
        }, {new: true, runValidators: true});
        res.send(updatedWarehouse);
    } catch(error) {
        res.status(400).send(error);
    }
});

module.exports = router;