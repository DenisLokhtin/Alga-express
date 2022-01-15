const express = require("express");
const Package = require('../models/Package');
const filter = require("../middleware/filter");
const auth = require("../middleware/auth");
const packageValidate = require("../middleware/packageValidate");
const permit = require("../middleware/permit");
const userEdit = require("../middleware/userEdit");
const test = require("../middleware/test");

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const query = {};

    if (req.query.id) query.id = req.query.id;
    if (req.query.history) query.history = req.query.history;
    if (req.query.sort) {
        query.sort = {[req.query.sort]: -1};
    } else {
        query.sort = 'date';
    }

    query.role = req.user.role;
    query.user_id = req.user._id;
    let findFilter = {};

    try {
        findFilter = filter(query);
        const packages = await Package.find(findFilter)
            .populate('user', 'name')
            .sort(query.sort);

        res.send(packages);
    } catch (e) {

    }
});
//
// router.get('/:id', auth, async (req, res) => {
//     console.log(req.params.id);
//     // if (req.user.role === 'user')
//     //     if (req.user.role === 'admin')
//
//             try {
//                 const packageFind = await Package.find();
//
//                 console.log('packageFind: ', packageFind);
//                 if (packageFind) {
//                 }
//                 res.send('ok');
//             } catch (e) {
//                 res.send(e);
//                 console.log(e);
//             }
//
// });

router.post('/', auth, packageValidate, async (req, res) => {
    try {
        const packageData = {
            country: req.body.country,
            title: req.body.title,
            trackNumber: req.body.trackNumber,
            amount: req.body.amount,
            price: req.body.price,
            user: req.user._id
        };

        const newPackage = new Package(packageData);

        await newPackage.save();
        res.send(newPackage);

    } catch (error) {
        const modelFields = Object.keys(error.errors);

        for (const key of modelFields) {
            switch (key) {
                case 'country':
                    error.errors[key].message = 'Поле Страна обязательное';
                    break;
                case 'trackNumber':
                    error.errors[key].message = 'Поле Трек-Номер обязательное';
                    break;
                case 'title':
                    error.errors[key].message = 'Поле Название обязательное';
                    break;
                case 'amount':
                    if (error.errors.amount.properties.min === 0) {
                        error.errors[key].message;
                    } else {
                        error.errors[key].message = 'Поле Количество обязательное';
                    }
                    break;
                case 'price':
                    if (error.errors['price'].properties.min === 0) {
                        error.errors[key].message;
                    } else {
                        error.errors[key].message = 'Поле Цена обязательное';
                    }
            }
        }
        res.status(400).send(error);
    }
});

router.put('/:id', auth, packageValidate, async (req, res) => {

    // if (req.user.role === 'user')
    // if (req.user.role === 'admin')

    try {
        const packageFind = await Package.findById(req.params.id);
        const result = userEdit(req.user, packageFind, req.body);

        if (result.error)
            return res.status(result.code).send({error: result.error});

        if (result.message)
            return res.status(result.code).send({message: result.message});

        if (result.success) {
            console.log(result.success);
            await result.success.save();
            return res.status(result.code).send(result.success);
        }

    res.send('ok');
    } catch (e) {
        res.status(500).send({error: e});
    }


});

router.delete('/', auth, async (req, res) => {
    const deletedData = {
        deleted: true,
    };

    try {


    } catch (e) {

    }
});
module.exports = router;