const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const Buyout = require("../models/Buyout");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const User = require("../models/User");
const PaymentMove = require("../models/PaymentMove");
const fs = require("fs");
const Currency = require("../models/Currency");

const newDir = `${config.uploadPath}/buyouts`;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const existFile = fs.existsSync(newDir);

        if (!existFile) {
            fs.mkdir(newDir, error => cb(error, newDir));
        }

        cb(null, config.uploadPath);
    },
    filename: async(req, file, cb) => {
        let pathFile = 'buyouts/' + nanoid() + path.extname(file.originalname);
        //Проверяю на наличие файла в базе
        const image = await Buyout.findById(req.params.id);
        //Если найдена запись, то мы передаем такое же имя файла
        if (image && image.image){

            pathFile = image.image.slice(8, image.image.length);
        }
        // Записываем фоный файл, под старым названием
        cb(null, pathFile);
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', auth, permit('admin', 'user', 'superAdmin'), async (req, res) => {
    try {

        if (req.user.role === 'user') {
            const selfBuyouts = await Buyout.find({user: req.user._id}).populate('user', 'name ');
            res.send({data: selfBuyouts});
        } else {
            const buyouts = await Buyout.find({$and: [{deleted: {$ne: true}}, {status: 'NEW'}]}).populate('user', 'name');
            res.send({total: buyouts.length, data: buyouts});
        }

    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', auth, permit('admin', 'user', 'superAdmin'), async (req, res) => {
    try {

        if (req.user.role === 'user') {
            const selfBuyout = await Buyout.find({user: req.user._id, _id: req.params.id}).populate('user', 'name ');
            res.send(selfBuyout);
        } else {
            const buyout = await Buyout.find({_id: req.params.id, deleted: {$ne: true}}).populate('user', 'name');
            res.send(buyout);
        }

    } catch (e) {
        res.sendStatus(500);
    }
});


router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const buyoutData = {
            description: req.body.description,
            url: req.body.url,
            user: req.user._id,
            country: req.body.country,
            price: req.body.price,
        };

        if (req.file) {
            buyoutData.image = 'uploads/' + req.file.filename;
        }

        const buyout = new Buyout(buyoutData);
        await buyout.save();
        res.send(buyout);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const buyout = await Buyout.findById(req.params.id);

        if (Object.keys(buyout).length === 0) {
            return res.status(404).send({error: `Выкуп с ID=${req.params.id} не найден.`});
        } else {
            buyout.deleted = true;
            await buyout.save();
            return res.send({message: `Выкуп успешно удален.`})
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put('/:id', auth, upload.single('image'), permit('admin', 'user'), async (req, res) => {
    const price = Number(req.body.price);
    const commission = Number(req.body.commission);
    const value = req.body.value;
    console.log('body: ', req.body);
    console.log('price: ', typeof (price), price);
    console.log('commission: ', typeof (commission), commission);
    try {
        if (req.user.role === 'admin') {
            const updatedPrice = await Buyout.findById(req.params.id);
            const user = await User.findById(updatedPrice.user);
            const currency = await Currency.findOne();
            //поверка на наличие изменения цены доставки, если цена изменилась тогда выполняется
            //создание новой записи в paymentMove и списывается средства с баланса пользователя.
            //согласно комиссии пользователя.
            //Еще нужно добавить курс вылюты.
            if ((price !== updatedPrice.price) || (commission !== updatedPrice.commission) || (value !== updatedPrice.value)) {
                updatedPrice.price = price;
                updatedPrice.commission = commission;
                updatedPrice.value = value;
                const currencyCorrect = Number(currency[value.toLowerCase()]);
                const totalPrice = ((price * (commission / 100) + price) * currencyCorrect).toFixed(2);
                updatedPrice.totalPrice = Number(totalPrice);
                updatedPrice.status = 'ORDERED';
                await updatedPrice.save();

                await User.findByIdAndUpdate(updatedPrice.user, {balance: user.balance - totalPrice})
                const buyoutMove = {
                    debit: updatedPrice._id,
                    debit_amount: totalPrice,
                    lastBalance: user.balance,
                    status: 'DEBIT',
                };

                const paySave = new PaymentMove(buyoutMove);
                console.log(paySave);
                await paySave.save();
            }

            res.send(updatedPrice);
        //
        } else if (req.user.role === 'user') {
            const newObj = {
                description: req.body.description,
                url: req.body.url,
                country: req.body.country,
            }

            if (req.file) {
                newObj.image = 'uploads/buyouts/' + req.file.filename;
            }
            const updatedBuyout = await Buyout.findByIdAndUpdate(req.params.id, {newObj}, {
                new: true,
                runValidators: true
            });

            res.send(updatedBuyout);

        }

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});


module.exports = router;