const express = require('express');
const Currency = require('../models/Currency');
const permit = require("../middleware/permit");
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, permit('admin'), async (req, res) => {
   try {
       const currency = await Currency.find();
       res.send(currency);
   } catch (e) {
       res.status(500).send(e);
   }
});

router.put('/:id',auth, permit('admin'), async (req, res) => {
    try {
        const currency = await Currency.findById(req.params.id);

        if (req.body.usd) currency.usd = req.body.usd;
        if (req.body.try) currency.try = req.body.try;
        if (req.body.cny) currency.cny = req.body.cny;

        await currency.save();
        res.send({message: "Валюта обновлена !"});
    } catch (e) {
        res.status(500).send(e);
        console.log(e)
    }
});

module.exports = router;