const Pages = require("../models/Pages");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const express = require("express");

const router = express.Router();

router.get('/:page', async (req, res) => {
    try {
        const page = await Pages.find({nameURL: req.params.page});
        res.send(page);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/:page', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const updatedPage = await Pages.findOneAndUpdate({nameURL: req.params.page}, {
            text: req.body.text,
        }, );

        res.send(updatedPage);

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;




