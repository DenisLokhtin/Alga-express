const packageValidate = async (req, res, next) => {
    try {
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

    } catch (error) {
        res.status(400).send(error);
    }
    next();
};

module.exports = packageValidate;
