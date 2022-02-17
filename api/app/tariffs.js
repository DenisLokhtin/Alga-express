const express = require('express');
const TariffGroup = require("../models/TariffGroup");

const router = express.Router();


router.get('/', async(req,res)=>{
    try {
        const currentTariffs = await TariffGroup.find();
        console.log(currentTariffs)
        res.send(currentTariffs);
    }catch (e) {
        res.status(500).send(e);
    }
})



module.exports = router;





















