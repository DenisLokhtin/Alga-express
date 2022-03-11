const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    urlYoutube: {
        type: String,
        required: true,
    },
});

const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;