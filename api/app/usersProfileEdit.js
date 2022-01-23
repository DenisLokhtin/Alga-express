const mongoose = require('mongoose');
const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const multer = require("multer");
const config = require("../config");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, req.user._id + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/:id', auth, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('email name passport phone');

        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/:id', auth, upload.single('avatar'), async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        console.log(userData);
            userData.name = req.body.name || userData.name;
            userData.email = req.body.email || userData.email;
            userData.phone = JSON.parse(req.body.phone) || userData.phone;

        if (req.file) {
            userData.avatar = req.file.filename;
        }

        const user = await User.findByIdAndUpdate(req.params.id, userData)
            .select('token role name balance phone avatar');

        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;