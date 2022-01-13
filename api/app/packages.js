const express = require("express");
const axios = require('axios');
const config = require('../config');
const Package = require('../models/Package');
const User = require('../models/User');
const filter = require("../middleware/filter");

const router = express.Router();

router.get('/', async (req, res) => {
    const query = {};

    if (req.query.id) query.id = req.query.id;
    if (req.query.history) query.history = req.query.history;
    if (req.query.user) query.user = req.query.user;
    let findFilter = {};

    try {
        const findUser = await User.findById(query.id);
        findFilter = filter(query, findUser);
        const packages = await Package.find(findFilter);

        res.send(packages);
    } catch (e) {

    }
});

router.post('/', async (req, res) => {
    if (!req.body.trackNumber || !req.body.title || !req.body.amount || !req.body.price) {
        return res.status(400).send({error: 'Data No Valid'});
    }

    const packageData = {
        title: req.body.title,
        trackNumber: req.body.trackNumber,
        amount: req.body.amount,
        price: req.body.price,
    };

    const package = new Package(packageData);

    try {
        await package.save();
        res.send(package);
    } catch (e) {
        console.log(e);
    }
});

router.put('/', async (req, res) => {
    try {

    } catch (e) {

    }
});

router.delete('/', async (req, res) => {
    const deletedData = {
        deleted: true,
    };

    try {


    } catch (e) {

    }
});
module.exports = router;