const express = require('express');
const User = require('../models/User');
const TariffGroup = require("../models/TariffGroup");
const permit = require("../middleware/permit");
const auth = require("../middleware/auth");
const {nanoid} = require("nanoid");
const sendMail = require('../middleware/sendMail');
const bcrypt = require("bcrypt");
const emailDistribution = require("../email-texts");


const SALT_WORK_FACTOR = 10;
const router = express.Router();

router.get('/', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const users = await User.find({role: 'user'})
            .select('name email');
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/notification', auth, permit('admin'), async (req, res) => {
    try {
        const notification = await User.findById(req.user._id)
            .select('notification');
        res.send(notification);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', async (req, res) => {
    try {

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).send({
                errors: {password: {message: "Пароли не совпадают"}},
            });
        }

        const tariff = await TariffGroup.findOne({new: {$exists: true}});
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            phone: {number: req.body.phone},
            name: req.body.name,
            role: req.body.role,
            tariff: {
                usa: tariff.usa,
                turkey: tariff.turkey,
                turkeyGround: tariff.turkeyGround,
                china: tariff.china,
                chinaGround: tariff.chinaGround,
            },
        });

        user.generateToken();
        await user.save();

        if (req.body?.creator === 'superAdmin') {
            return res.send({creator: req.body.creator});
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/notification', auth, permit('admin'), async (req, res) => {
    try {
        const notification = await User.findById(req.user._id);
        notification.notification = req.body.payload;

        notification.save({validateBeforeSave: false});
        res.send(notification.notification);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({message: 'Пожалуйста, введите корректный email-адрес или Пароль'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({message: 'Пожалуйста, введите корректный email-адрес или Пароль'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    user = await User.findOne({email: req.body.email})
        .select('token role name balance phone avatar group');

    res.send(user);
});

router.post('/forgot', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        console.log(user)

        if (!user) return res.status(404).send({message: 'Такая почта не найдена'});

        const resetCode = nanoid(8);
        await User.findOneAndUpdate({email: user.email}, {resetCode});
       await sendMail({email: user.email}, 'Сброс пароля', null, emailDistribution.passwordReset(resetCode, user.name))
        res.send({message: "Код сброса пароля отправлен на почту!"})

        const userToBeUpdated = await User.findOne({resetCode: resetCode});

        const deleteResetCode = async ()=>{
            if(userToBeUpdated){
                await User.findByIdAndUpdate(userToBeUpdated._id,{resetCode: ''});
            }
        }

        setTimeout(deleteResetCode,300000);

    } catch (e) {
        res.status(500).send(e);
    }
});


router.post('/reset', async (req, res) => {
    try {
        let user = await User.findOne({resetCode: req.body.secretCode});
        if (!user) {
            console.log('error')
            return res.status(404).send({message: 'Неправильный код'})
        }
        user.password = req.body.password

        user.$ignore('email');
       await user.save()
// const newPassword = req.body.password
//
//         const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
//         const password2 = await bcrypt.hash(newPassword, salt);

        // await User.findOneAndUpdate({resetCode: req.body.secretCode}, {password: password2});
        res.send({message: " Пароль успешно изменен"});
    } catch (e) {
        console.log(e.message)
        res.status(500).send(e);
    }
})

router.post('/change', auth, async (req, res) => {
    try {
        let user = await User.find({_id: req.user._id});
        if (!user) {
            console.log('error')
            return res.status(401).send({message: 'Доступ запрещен'})
        }
        user.password = req.body.password

        user.$ignore('email');
        await user.save()
        res.send({message: " Пароль успешно изменен"});
    } catch (e) {
        res.status(500).send(e);
    }
})

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();

    await user.save({validateBeforeSave: false});

    return res.send(success);
});

module.exports = router;





















