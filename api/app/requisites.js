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

router.put('/:bank', auth, permit('admin'), async (req, res) => {
    try {
        const updatedRequisites = await Requisites.findOneAndUpdate({nameURL: req.params.bank}, {
            requisites: req.body.requisites,
        });

        res.send(updatedRequisites);

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
