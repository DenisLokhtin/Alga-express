const express = require('express');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Carousel = require("../models/Carousel");
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const fs = require("fs");
const {rootPath} = require("../config");
const newDir = `${config.uploadPath}/carousel`;


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const existFile = fs.existsSync(newDir);

        if (!existFile) {
            fs.mkdir(newDir, error => cb(error, newDir));
        }

        cb(null, config.uploadPath);
    },
    filename: async (req, file, cb) => {
        let pathFile = 'carousel/' + nanoid() + path.extname(file.originalname);

        const image = await Carousel.findById(req.params.id);

        if (image) {
            fs.unlinkSync(rootPath + '/public/uploads/' + image.picture.slice(8, image.picture.length));
        }

        cb(null, pathFile);
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        const carousels = await Carousel.find({deleted: {$ne: true}});
        res.send(carousels);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const carousel = await Carousel.findById(req.params.id);

        if (carousel) {
            res.send(carousel);
        } else {
            res.status(404).send({error: 'Carousel not found'});
        }
    } catch {
        res.sendStatus(500);
    }
});


router.post('/', auth, permit('admin', 'superAdmin'), upload.single('picture'), async (req, res) => {

    try {
        const carouselData = {
            info: req.body.info,
        };

        if (req.file) {
            carouselData.picture = 'uploads/' + req.file.filename;
        }

        const carousel = new Carousel(carouselData);
        await carousel.save();
        res.send(carousel);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const carousel = await Carousel.findByIdAndRemove(req.params.id);
        if (carousel) {
            res.send(`Изображение удалено'`);
            fs.unlinkSync(rootPath + '/public/' + carousel.picture);
        } else {
            res.status(404).send({error: 'Picture not found'});
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put('/:id', auth, permit('admin', 'superAdmin'), upload.single('picture'), async (req, res) => {
    try {
        const updatedCarousel = await Carousel.findById(req.params.id);
        updatedCarousel.info = req.body.info;

        if (req.file) {
            updatedCarousel.picture = 'uploads/' + req.file.filename;
        }

        const carousel = new Carousel(updatedCarousel);
        await carousel.save();
        res.send(carousel);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;