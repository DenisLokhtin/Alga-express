const express = require('express');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Player = require("../models/Player");
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const players = await Player.find({deleted: {$ne: true}});
        res.send(players);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);

        if (player) {
            res.send(player);
        } else {
            res.status(404).send({error: 'Video not found'});
        }
    } catch {
        res.sendStatus(500);
    }
});


router.post('/', auth, permit('admin', 'superAdmin'), async (req, res) => {
    console.log(req.body)
    try {
        const playerData = {
            urlYoutube: req.body.urlYoutube,
        };


        const player = new Player(playerData);
        await player.save();
        res.send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const player = await Player.findByIdAndRemove(req.params.id);

        if (player) {
            res.send(`Video removed'`);
        } else {
            res.status(404).send({error: 'Video not found'});
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.put('/:id', auth, permit('admin', 'superAdmin'), async (req, res) => {
    try {
        const updatedPlayer = await Player.findById(req.params.id);
        updatedPlayer.urlYoutube = req.body.urlYoutube;


        const player = new Player(updatedPlayer);
        await player.save();

        res.send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;