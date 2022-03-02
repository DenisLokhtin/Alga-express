const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const BuyoutSchema = new mongoose.Schema({
    url: {
        type: String,
        required: 'Ссылка * обязательное поле',
    },
    image: {
        type: String,
        required: 'Скриншот или фото * обязательное поле',
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
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        trim: true,
        enum: ['NEW', 'ACCEPTED', 'ORDERED'],
        default: 'NEW',
    },
    price: {
        type: Number,
        min: [0, 'Цена не может быть меньше нуля'],
    },
    commission: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    value: {
        type: String,
        enum: ['USD', 'TRY', 'CNY'],
    },
    totalPrice: {
        type: Number,
    },


});

BuyoutSchema.plugin(idValidator);
const Buyout = mongoose.model('Buyout', BuyoutSchema);
module.exports = Buyout;