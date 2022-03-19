const express = require('express');
const TariffGroup = require("../models/TariffGroup");
const permit = require("../middleware/permit");
const auth = require('../middleware/auth');

const router = express.Router();


router.get('/', async(req,res)=>{
    try {
        const currentTariffs = await TariffGroup.find();
        res.send(currentTariffs);
    }catch (e) {
        res.status(500).send(e);
    }
});

router.put('/', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const tariff = await TariffGroup.findByIdAndUpdate(req.body.id, req.body.data);

        if (tariff) {
            return res.send(tariff);
        } else {
            res.status(500).send({error: 'Какая-то ошибка'});
        }
    } catch (e) {
        res.status(500).send({error: e});
    }
});



module.exports = router;





















