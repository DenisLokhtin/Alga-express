const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const News = require('../models/News');
const auth = require("../middleware/auth");


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
    const news = await News.find({deleted: {$ne : true}});
    res.send(news);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const info = await News.findById(req.params.id);

    if (info) {
      res.send(info);
    } else {
      res.status(404).send({error: 'Info not found'});
    }
  } catch {
    res.sendStatus(500);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const newsData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) {
      newsData.image = 'uploads/' + req.file.filename;
    }


    const news = new News(newsData);

    await news.save();
    res.send(news);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (Object.keys(news).length === 0) {
      return res.status(404).send({error: `Новость не найдена.`});
    } else {
      news.deleted = true;
      await news.save();
      return  res.send({message: `Новость ${news.title} успешно удалена.`})
    }
  } catch (error) {
    res.status(404).send(error);
  }
});


router.put('/:id', async (req, res) => {
  try {
    await News.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description
    });

    res.send('Новость обновлена');

  } catch(error) {
    res.send(400).send('Server Error');
  }
});

module.exports = router;