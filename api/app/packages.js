const express = require("express");
const Package = require('../models/Package');
const filter = require("../middleware/filter");
const auth = require("../middleware/auth");
const packageValidate = require("../middleware/packageValidate");
const permit = require("../middleware/permit");
const userEdit = require("../middleware/userEdit");
const adminEdit = require("../middleware/adminEdit");
const Tariff = require("../models/Tariff");

const router = express.Router();

router.get('/', auth, permit('admin', 'warehouseman', 'user'), async (req, res) => {

    const query = {};

    if (Number.isInteger(req.query.page))
        return res.status(403).send({error: 'Не корректные данные запроса'});

    let page = null;
    let limit = null;

    if (req.body.page)
        page = parseInt(req.query.page) || 0;
    if (req.body.limit)
        limit = parseInt(req.query.limit) || 20;

    if (req.query.id) query.id = req.query.id;
    if (req.query.history) query.history = req.query.history;
    if (req.query.sort) {
        query.sort = {[req.query.sort]: 1};
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
            .sort(query.sort)
            .limit(limit)
            .skip(page * limit);

        res.send(packages);
    } catch (e) {
        res.status(500).send({error: 'some error'});
    }
});

router.get('/:id', auth, permit('admin', 'warehouseman', 'user'), async (req, res) => {
    try {
        const packageFind = await Package.findById(req.params.id)
                                    .populate('user', 'name');

        if ((req.user.role === 'user') && (packageFind.user.toString() === req.user._id.toString())) {
            return res.send(packageFind);
        }

        if ((req.user.role === 'admin') || (req.user.role === 'warehouseman')) {
            return  res.send(packageFind);
        }

        res.status(403).send({error: 'Доступ запрещен'});
    } catch (e) {
        res.status(500).send({error: 'some error'});
    }

});

router.post('/', auth, packageValidate, permit('admin', 'warehouseman', 'user'), async (req, res) => {
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

router.put('/:id', auth, packageValidate, permit('admin', 'warehouseman', 'user'), async (req, res) => {
    let result = {};

    try {
        const packageFind = await Package.findById(req.params.id);
        const prices = await Tariff.findOne({user: packageFind.user});

        if (req.user.role === 'user')
            result = userEdit(req.user, packageFind, req.body);

        if (req.user.role === 'admin' || req.user.role === 'warehouseman')
            result = adminEdit(req.user, packageFind, req.body, prices);

        if (result.error)
            return res.status(result.code).send({error: result.error});

        if (result.message)
            return res.status(result.code).send({message: result.message});

        if (result.success) {
            await result.success.save();
            return res.status(result.code).send(result.success);
        }

        res.send(result.success);
    } catch (e) {
        res.status(500).send({error: 'some error'});

    }


});

router.delete('/:id', auth, permit('admin', 'warehouseman', 'user'), async (req, res) => {
    try {
        const erasePackage = await Package.findById(req.params.id);

        if (erasePackage.status === 'ISSUED')
            return res.status(400).send({error: 'Доступ запрещен'});

        if (req.user.role === 'admin')
            erasePackage.delete = true;

        if (req.user.role === 'user')
            erasePackage.status = 'ERASED';

        await erasePackage.save();

        res.status(200).send({message: `Посылка ${erasePackage.cargoNumber} удалена успешно`});
    } catch (e) {
        res.status(500).send({error: 'some error'});
    }
});
module.exports = router;