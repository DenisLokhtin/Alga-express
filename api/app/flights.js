const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Flight = require('../models/Flight');
const Package = require('../models/Package');
const sendMail = require('../middleware/sendMail');

const router = express.Router();

router.post('/', auth, permit('admin'),async (req, res) => {
    try {
        const flightData = {
            number: req.body.number,
            depart_date: req.body.depart_date,
            arrived_date: req.body.arrived_date,
            description: req.body.description,
        }

        const flight = new Flight(flightData);

        await flight.save();
        res.send(flight);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/:id',  auth, permit('admin'), async (req, res) => {
    try {
        const oldFlight = await Flight.findById(req.params.id);

        if (!req.body.number) {
            return res.status(500).send({message: 'Заполните пустое поле!'});
        }

        const flightData = {
            number: req.body.number,
            depart_date: req.body.depart_date || oldFlight.depart_date,
            arrived_date: req.body.arrived_date || oldFlight.arrived_date,
            description: req.body.description,
            status: req.body.status
        }

        if (req.body.status === 'DONE') {
            let users = [];
            const getUsers = await Package.find({flight: oldFlight._id.toString()}).populate({path: 'user', select: 'email'});

            getUsers.map(user => {
                users.push(user.user.email);
            })

            console.log(users);

            // sendMail('test@gmail.com', 'test', 'test body');

            // sendMail.sendMail();

            // const mailData = {
            //     from: "timetotestmail@gmail.com",
            //     to: users.toString(),
            //     subject: `Рейс ${oldFlight.number} прибыл!`,
            //     text: `Вас приветствует компания Alga Express, рейс ${oldFlight.number} прибыл, ваша посылка тоже!`,
            // }
            //
            // await sendMail.sendMail(mailData, function (err, info) {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     console.log('Sent: ', info.response);
            // })
        }

        const flight = await Flight.findByIdAndUpdate(req.params.id, flightData);

        res.send({message: "Success", flight});
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/', auth, permit('admin'),async (req, res) => {
    let page = 0;
    let limit = 10;
    let status = null;

    if (req.query.page) {
        page = req.query.page;
    }

    if (req.query.limit) {
        limit = req.query.limit;
    }

    if (req.query.status) {
        status = req.query.status;
    }

    try {
        const size = await Flight.find({status: status});

        const flights = await Flight.find({status: status})
            .sort({date: -1})
            .limit(limit)
            .skip(page * limit);

        res.send({totalElements: size.length, data: flights});
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        res.send(flight);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;