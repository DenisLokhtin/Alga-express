const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const multer = require("multer");
const config = require("../config");
const path = require("path");
const dayjs = require('dayjs');
const Payment = require("../models/Payment");
const fs = require("fs");
const {nanoid} = require("nanoid");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let newDir = `${config.uploadPath}`;

        if (file.fieldname === 'avatar') {
            newDir = newDir + '/avatar';
        }
        if (file.fieldname === 'passport') {
            newDir = newDir + '/passport';
        }
        if (file.fieldname === 'payment') {
            newDir = newDir + '/payment';
        }

        const existFile = fs.existsSync(newDir);

        if (!existFile) {
            fs.mkdir(newDir, error => cb(error, newDir));
        }

        cb(null, config.uploadPath);
    },
    filename: async (req, file, cb) => {
        let user_id = '';

        if (req.user.role === 'admin') {
            user_id = req.params.id;
        } else {
            user_id = req.user._id;
        }
        if (file.fieldname === 'avatar') {
            cb(null, file.fieldname + '/' + user_id + path.extname(file.originalname))
        }

        if (file.fieldname === 'passport') {
            cb(null, file.fieldname + '/' + nanoid() + path.extname(file.originalname));
        }

        if (file.fieldname === 'payment') {
            let index = 0;
            let str = null;
            try {
                str = await Payment.find({user: req.user._id});
            } catch (e) {
                console.log(e);
            }

            if (str.length > 0) {
                const firstIndex = str[str.length - 1].image.indexOf('/', 8);
                const secondIndex = str[str.length - 1].image.indexOf('_', 8);
                const i = parseInt(str[str.length - 1].image.substr(firstIndex + 1, (secondIndex - firstIndex) - 1));
                if (!isNaN(i)) {
                    index = i + 1;
                }
            }
            cb(null, file.fieldname + '/' + index + '_' + dayjs(new Date()).format('DDMMYYYY') + '_' + user_id + path.extname(file.originalname))
        }
    }
});

const upload = multer({storage});

router.get('/payment', auth, async (req, res) => {
    let page = 0;
    let limit = 10;

    if (req.query.page) {
        page = req.query.page;
    }

    if (req.query.limit) {
        limit = req.query.limit;
    }

    try {
        const size = await Payment.find({user: req.user._id});
        const response = await Payment.find({user: req.user._id})
            .select('image description date status')
            .sort({date: -1})
            .populate('user', 'name')
            .limit(limit)
            .skip(page * limit);

        res.send({totalElements: size.length, data: response});
    } catch (e) {
        res.status(400).send({error: e});
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('email name passport phone avatar');

        if ((req.user.role !== 'admin' && req.user.role !== 'superAdmin') && (req.user._id.toString() !== user._id.toString())) {
            return res.status(403).send({error: 'Доступ запрещен'});
        } else {
            if ((req.user.role === 'admin' || req.user.role === 'superAdmin') || (req.user._id.toString() === user._id.toString())) {
                return res.status(200).send(user);
            }
        }
        res.status(403).send({error: 'Доступ запрещен'});
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/:id', auth, upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        }, {
            name: 'passport',
            maxCount: 2,
        }
    ]),
    async (req, res) => {
        const userData = {};
        try {
            const user = await User.findById(req.params.id);
            for (const key in req.files) {
                userData.passport = user.passport;
                if (key === 'passport') {
                    Object.keys(req.files[key]).map((keys, i) => {
                        const pathname = 'uploads/' + req.files[key][keys].filename;
                        userData.passport.push({image: pathname});
                    });

                } else {
                    if (key === 'avatar') {
                        userData.avatar = 'uploads/' + req.files['avatar'][0].filename;
                    }
                }
            }

            userData.name = req.body.name || user.name;
            userData.email = req.body.email || user.email;
            if (req.body.phone) {
                userData.phone = JSON.parse(req.body.phone);
            }

            if ((req.user.role === 'admin') || (req.user._id.toString() === user._id.toString())) {
                await User.findByIdAndUpdate(req.params.id, userData);
                const user = await User.findByIdAndUpdate(req.params.id, userData)
                    .select('token role name balance phone avatar passport email');
                return res.status(200).send(user);
            }

            res.status(403).send({error: 'Доступ запрещен'});
        } catch (e) {
            console.log(e);
            res.status(400).send({error: e});

        }
    });

router.post('/payment', auth, upload.single('payment'), async (req, res) => {
    const paymentData = {};
    console.log(req.body);
    console.log(req.file);
    try {
        if (req.body.payment) {
            paymentData.description = req.body.payment;
        }

        if (req.file) {
            paymentData.image = 'uploads/' + req.file.filename;
        }

        paymentData.user = req.user._id;

        const payment = new Payment(paymentData);
        await payment.save();

        res.send('payment');
    } catch (e) {
        res.status(400).send({error: e});
    }
});


module.exports = router;