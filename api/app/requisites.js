const Requisites = require("../models/Requisites");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const express = require("express");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const requisites = await Requisites.find({});
        res.send(requisites);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/:bank', async (req, res) => {
    try {
        const requisites = await Requisites.find({bank: req.params.bank});
        res.send(requisites);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/edit/:bank', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const updatedRequisites = await Requisites.findOneAndUpdate({bank: req.params.bank}, {
            requisites: req.body.requisites,
        });

        res.send(updatedRequisites);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:bank', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const requisites = await Requisites.findOneAndDelete({bank: req.params.bank});

        res.send(requisites);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/add', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
       const data = {
           requisites: req.body.requisites,
           bank: req.body.bank,
       };

        const newRequisites = new Requisites(data);

        await newRequisites.save();
        res.send(newRequisites);

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
