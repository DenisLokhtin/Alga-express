const express = require("express");
const Package = require('../models/Package');
const filterPackage = require("../middleware/filter");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const userEdit = require("../middleware/userEdit");
const adminEdit = require("../middleware/adminEdit");
const NotFoundTrackNumber = require('../models/NotFoundTrackNumber');
const PaymentMove = require("../models/PaymentMove");
const User = require("../models/User");
const Currency = require('../models/Currency');
const packageValidate = require("../middleware/packageValidate");

const router = express.Router();

router.get('/newPackages', auth, permit('admin', 'warehouseman', 'user', 'superAdmin'), async (req, res) => {
    try {
        const packages = await Package.find({status: 'REGISTERED'}).select('title cargoNumber amount price country');
        res.send(packages);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/', auth, permit('admin', 'user', 'superAdmin'), async (req, res) => {
    const query = {};

    if (Number.isInteger(req.query.page))
        return res.status(403).send({error: 'Не корректные данные запроса'});

    let page = 0;
    let limit = 20;

    if (req.query.page) {
        page = Number(req.query.page);
    }

    if (req.query.limit) {
        limit = Number(req.query.limit);
    }

    if (req.query.id) query.id = req.query.id;
    if (req.query.history) query.history = req.query.history;
    if (req.query.sort) {
        query.sort = {[req.query.sort]: 1};
    } else {
        query.sort = {date: 1};
    }

    query.role = req.user.role;
    query.user_id = req.user._id;
    let findFilter = {};

    try {
        findFilter = filterPackage(query, 'packages');
        const size = await Package.find(findFilter);

        const packages = await Package.find(findFilter)
            .populate({path: 'flight user', select: 'name number description depart_date arrived_date'})
            .select('title trackNumber country cargoNumber status description price currency delivery amount')
            .sort(query.sort)
            .limit(limit)
            .skip(page * limit);

        res.send({totalPage: Math.ceil(size.length), packages: packages});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', auth, permit('admin', 'warehouseman', 'user', 'superAdmin'), async (req, res) => {
    try {

        if (req.user.role === 'user') {
            const packageFind = await Package.findById(req.params.id)
                .populate({path: 'flight user', select: 'name number description depart_date arrived_date'})
                .select('trackNumber title amount price country status date cargoNumber currency urlPackage delivery');
            if (packageFind.user._id.toString() === req.user._id.toString()) {
                return res.send(packageFind);
            }
        }

        if ((req.user.role === 'admin') || (req.user.role === 'superAdmin')) {
            const packageFind = await Package.findById(req.params.id)
                .populate({path: 'flight user', select: 'name number description depart_date arrived_date'})
                .select('trackNumber title amount price country status ' +
                    'date cargoNumber width length height cargoWeight cargoPrice urlPackage delivery');
            return res.send(packageFind);
        }

        res.status(403).send({error: 'Доступ запрещен'});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', auth, packageValidate, permit('admin', 'superAdmin', 'user'), async (req, res) => {

    let price = req.body.price;

    if (req.body.price.indexOf(',') === 0) {
        price = req.body.price;
    } else if (req.body.price.indexOf(',') > 0) {
        price = req.body.price.replace(/,/g, '.');
    }

    try {

        const packageData = {
            country: req.body.country,
            title: req.body.title,
            trackNumber: req.body.trackNumber,
            amount: req.body.amount,
            price: price,
            user: req.user._id,
            currency: req.body.currency,
        };

        const packageAdmin = {
            country: req.body.country,
            title: req.body.title,
            trackNumber: req.body.trackNumber,
            amount: req.body.amount,
            price: price,
            user: req.body.userId,
            currency: req.body.currency,
        }

        const notFoundTrackNumber = await NotFoundTrackNumber.findOne({notFoundTrackNumber: packageData.trackNumber});

        if (notFoundTrackNumber) {
            packageData.status = notFoundTrackNumber.status;
        }

        if (req.user.role === 'admin') {
            const newPackage = new Package(packageAdmin);
            await newPackage.save();
            return res.send(newPackage);
        } else {
            const newPackage = new Package(packageData);
            await newPackage.save();
            return res.send(newPackage);
        }

    } catch (error) {
        console.log(error.message);
        if (error.errors?.price?.name === 'CastError') {
            error.errors.price.message = 'Введите корректные данные!';
        }
        res.status(400).send(error);
    }
});

router.put('/', auth, permit('admin', 'warehouseman', 'superAdmin'), async (req, res) => {
    const notFoundTrackNumbers = [];

    const separatedBySpaces = req.body.trackNumbers.split(' ');

    const trackNumbersData = separatedBySpaces.map(trackNumber => (
        {trackNumber: trackNumber.replace(/(\r\n|\n|\r)/gm, ''), status: req.body.status})
    );

    const filtered = trackNumbersData.filter(packageStatus => packageStatus.trackNumber !== '');

    const uniquePackages = filtered.filter((packageInfo, index, self) =>
            index === self.findIndex((packageData) => (
                packageData.trackNumber === packageInfo.trackNumber
            ))
    );

    try {
        if (req.body.trackNumbers.length === 0) {
            return res.status(400).send({
                errors: {
                    trackNumber: {message: "Введите трек-номера"},
                },
            });
        }

        for (const key of uniquePackages) {
            const updatedStatuses = await Package.findOneAndUpdate(
                {trackNumber: key.trackNumber},
                {status: key.status},
                {new: true, runValidators: true});

            if (!updatedStatuses) {
                const notFoundTrackNumbersData = {
                    notFoundTrackNumber: key.trackNumber,
                    status: key.status,
                };

                const notFoundTrackNumber = new NotFoundTrackNumber(notFoundTrackNumbersData);

                await notFoundTrackNumber.save();

                notFoundTrackNumbers.push({trackNumber: key.trackNumber});
            }
        }

        const packages = await Package.find({status: 'DELIVERED'});
        console.log(packages);

        if (notFoundTrackNumbers.length > 0) {
            res.status(404).send(notFoundTrackNumbers);
        } else {
            res.send({message: 'Трек-номера были успешно изменены'});
        }

    } catch (error) {
        res.sendStatus(500)
    }
});

router.put('/packageDelivery', auth, permit('user'), async (req, res) => {
    try {
        const onePackage = await Package.find({trackNumber: req.body.trackNumber});

        const updatedPackage = await Package.findOneAndUpdate({trackNumber: req.body.trackNumber}, {
            delivery: !onePackage[0].delivery,
        });

        res.send(updatedPackage);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.put('/:id', auth, permit('admin', 'warehouseman', 'superAdmin', 'user'), async (req, res) => {
    let result = {};

    try {
        const packageFind = await Package.findById(req.params.id)
        const userDebit = await User.findById(packageFind.user._id);

        const currency = await Currency.findOne({});
        const prices = userDebit.tariff;

        if (req.user.role === 'user')
            result = userEdit(req.user, packageFind, req.body);

        if (req.user.role === 'admin' || req.user.role === 'warehouseman')
            result = adminEdit(req.user, packageFind, req.body, prices);

        if (result.error)
            return res.status(result.code).send({error: result.error});

        if (result.message)
            return res.status(result.code).send({message: result.message});

        if (result.success) {
            const debitAmount = (result.success.cargoPrice) * currency.usd;
            if (result.success.cargoPrice) {
                const permitData = {
                    debit: packageFind._id,
                    debit_amount: debitAmount,
                    permitPayment: req.user._id,
                    lastBalance: packageFind.user.balance,
                    status: 'DEBIT',
                };

                const paySave = new PaymentMove(permitData);
                await paySave.save();
                await User.findByIdAndUpdate(packageFind.user._id, {balance: userDebit.balance - debitAmount});

            }

           result.success.$ignore('trackNumber');
            await result.success.save();
            return res.status(result.code).send(result.success);
        }

        res.send(result.success);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin', 'warehouseman', 'superAdmin'), async (req, res) => {
    try {
        const erasePackage = await Package.findById(req.params.id);

        if (erasePackage.status === 'DONE')
            return res.status(403).send({error: 'Доступ запрещен'});

        if (req.user.role === 'admin')
            erasePackage.deleted = true;

        if (req.user.role === 'user')
            erasePackage.status = 'ERASED';

        await erasePackage.save();

        res.status(200).send({message: `Посылка ${erasePackage.cargoNumber} удалена успешно`});
    } catch (e) {
        res.status(400).send(e);
    }
});
module.exports = router;