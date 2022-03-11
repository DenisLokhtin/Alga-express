const Information = require("../models/Information");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const express = require("express");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const information = await Information.find({});
        res.send(information);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/:information', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const updatedInformation = await Information.findOneAndUpdate({name: req.params.information}, {
            text: req.body.text,
        }, );

        res.send(updatedInformation);

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;