const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const Market = require("../models/Market");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const markets = await Market.find({deleted: {$ne : true}});
        res.send(markets);
    } catch (e) {
        res.sendStatus(500);
    }
});


router.post('/', upload.single('image'), async (req, res) => {
    try {
        const marketData = {
            title: req.body.title,
            image: 'uploads/' + req.file.filename,
            url: req.body.url,
        };

        const market = new Market (marketData);
        await market.save();
        res.send(market);

    } catch (error) {
        res.status(400).send(error);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);

        if (Object.keys(market).length === 0) {
            return res.status(404).send({error: `Сайт ID=${req.params.id} не найден.`});
        } else {
            market.deleted = true;
            await market.save();
            return  res.send({message: `Cайт ${market.title} успешно удален.`})
        }
    } catch (error) {
        res.status(404).send(error);
    }
});




module.exports = router;