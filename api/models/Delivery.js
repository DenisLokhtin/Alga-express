const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');

const DeliverySchema = new mongoose.Schema({
    street: {
        type: String,
        trim: true,
        required: '"Улица" это обязательное поле'
    },
    house: {
        type: String,
        trim: true,
        required: '"Дом" это обязательное поле'
    },
    flat: {
        type: String,
        trim: true,
        required: '"Этаж" это обязательное поле'
    },
    trackNumber: {
        type: String,
        trim: true,
        required: '"Трэк номер" это обязательное поле'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    completed: {
        type: Boolean,
        default: false
    }
});

DeliverySchema.plugin(idValidator);
const Delivery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delivery;