const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const MarketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Название * обязательное поле',
    },
    image: {
        type: String,
        required: 'Логотип * обязательное поле',
    },
    url: {
        type: String,
        required: 'Ссылка * обязательное поле',
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

MarketSchema.plugin(idValidator);
const Market = mongoose.model('Market', MarketSchema);
module.exports = Market;