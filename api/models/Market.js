const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const MarketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

MarketSchema.plugin(idValidator);
const Market = mongoose.model('Market', MarketSchema);
module.exports = Market;