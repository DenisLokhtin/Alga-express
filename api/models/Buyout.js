const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const BuyoutSchema = new mongoose.Schema({
    url: {
        type: String,
        required: 'Ссылка * обязательное поле',
    },
    image: {
        type: String,
        required: 'Логотип * обязательное поле',
    },
    country: {
        type: String,
        trim: true,
        enum: ['USA', 'Turkey', 'China'],
        required: 'Поле Страна обязательное',
    },
    description:{
            type: String,
            required: 'Описание товара является обязательным полем',
    },
    deleted: {
        type: Boolean,
        default: false
    },
    datetime:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

BuyoutSchema.plugin(idValidator);
const Buyout = mongoose.model('Buyout', BuyoutSchema);
module.exports = Buyout;