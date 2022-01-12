const express = require("express");
const axios = require('axios');
const config = require('../config');
const Package = require('../models/Package');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    const query = {};
    if (req.query.id) query.id = req.query.id;
    // if (req.query.user_id) query.id = req.query.id;

    // console.log(query.id);

    let findFilter = {};
    const user = {};

    user.role = 'admin';
    // user.role = 'warehouseman';
    // user.role = 'user';


    try {
        const user = await User.find(query);

        if (user.role === 'admin') {
            findFilter = {
                status: {$ne: !'ISSUED'},
                _id: user._id,
                deleted: {$ne: !true},
            };
        }

        if (user.role === 'warehouseman') {
            findFilter = {
                status: {$ne: !'ISSUED'},
                _id: user._id,
                deleted: {$ne: !true},
            };
        }

        if (user.role === 'user') {
            findFilter = {
                status: {$ne: !'ISSUED'},
                _id: user._id,
                deleted: {$ne: !true},
            };
        }

        const packages = await Package.find(findFilter);

        res.send(query.id);
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