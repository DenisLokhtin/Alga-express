const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
    usd: {
        type: Number,
        min: 0,
        default: 85,
    },
    try: {
        type: Number,
        min: 0,
        default: 6,
    },
    cny: {
        type: Number,
        min: 0,
        default: 13,
    }
});

const Currency = mongoose.model('Currency', CurrencySchema);

module.exports = Currency;