const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const multer = require("multer");
const config = require("../config");
const path = require("path");
const dayjs = require('dayjs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        if (file.fieldname === 'avatar') {
            cb(null, file.fieldname + '/' + req.user._id + path.extname(file.originalname))
        }

        if (file.fieldname === 'passport') {
            const str = req.user.passport[(req.user.passport.length) - 1].image;
            const firstIndex = str.indexOf('/', 0);
            const secondIndex = str.indexOf('_', 0);
            let index = parseInt(str.substr(firstIndex + 1, (secondIndex - firstIndex) - 1));
            req.files['passport'].map(passport => {
                index++;
                cb(null, 'passport/' + index + '_' + dayjs(new Date()).format('DDMMYYYY') + '_' + req.user._id + path.extname(file.originalname))
            });
        }
    }
});

const upload = multer({storage});

router.get('/:id', auth, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('email name passport phone avatar');

        if ((req.user.role !== 'admin') && (req.user._id.toString() !== user._id.toString())) {
            return res.status(403).send({error: 'Доступ запрещен'});
        } else {
            if ((req.user.role === 'admin') || (req.user._id.toString() === user._id.toString())) {
                return res.status(200).send(user);
            }
        }
        res.status(403).send({error: 'Доступ запрещен'});
    } catch (e) {
        console.log(e);
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
            onError: function (err, next) {
                console.log('error', err);
                next(err);

            },
        }
    ]),
    async (req, res) => {
        const userData = {};
        console.log('put ', req.body);

        try {
            const user = await User.findById(req.params.id);

            for (const key in req.files) {
                userData.passport = user.passport;

                if (key === 'passport') {
                    Object.keys(req.files['passport']).map(keys => {
                        console.log(req.files.passport[keys].filename);
                        const pathname = req.files['passport'][keys].filename;
                        userData.passport.push({image: pathname});
                    });

                } else {
                    if (key === 'avatar') {
                        userData.avatar = req.files['avatar'][0].filename;
                    }

                    userData.name = req.body.name || user.name;
                    userData.email = req.body.email || user.email;
                    if (req.body.phone) {
                        userData.phone = JSON.parse(req.body.phone);
                    }

                }
            }

            if ((req.user.role === 'admin') || (req.user._id.toString() === user._id.toString())) {
                const user = await User.findByIdAndUpdate(req.params.id, userData)
                    .select('token role name balance phone avatar passport email');
                return res.status(200).send(user);
            }

            res.status(403).send({error: 'Доступ запрещен'});
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    });


module.exports = router;