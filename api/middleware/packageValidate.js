const Package = require("../models/Package");

const packageValidate = async (req, res, next) => {
    if (req.body.width && req.body.height) {
        if (!req.body.length) {
            return res.status(400).send({
                errors: {length: {message: "Поле Длина обязательное"}},
            });
        }
    }

    if (req.body.width && req.body.length) {
        if (!req.body.height) {
            return res.status(400).send({
                errors: {height: {message: "Поле Высота обязательное"}},
            });
        }
    }

    if (req.body.height && req.body.length) {
        if (!req.body.width) {
            return res.status(400).send({
                errors: {width: {message: "Поле Ширина обязательное"}},
            });
        }
    }

    if (req.body.width) {
        if (!req.body.length || !req.body.height) {
            return res.status(400).send({
                errors: {
                    length: {message: "Поле Длина обязательное"},
                    height: {message: "Поле Высота обязательное"},
                },
            });
        }
    }

    if (req.body.height) {
        if (!req.body.width || !req.body.length) {
            return res.status(400).send({
                errors: {
                    width: {message: "Поле Ширина обязательное"},
                    length: {message: "Поле Длина обязательное"},
                },
            });
        }
    }

    if (req.body.length) {
        if (!req.body.width || !req.body.height) {
            return res.status(400).send({
                errors: {
                    width: {message: "Поле Ширина обязательное"},
                    height: {message: "Поле Высота обязательное"},
                },
            });
        }
    }

    if (req.body.length && req.body.width && req.body.height) {
        const packageDataDimensions = {
            country: req.body.country,
            title: req.body.title,
            trackNumber: req.body.trackNumber,
            amount: req.body.amount,
            price: req.body.price,
            width: req.body.width,
            height: req.body.height,
            length: req.body.length,
            user: req.user._id,
        };

        const newPackage = new Package(packageDataDimensions);
        await newPackage.save();

        return res.send(newPackage);
    }

    next();
};

module.exports = packageValidate;
