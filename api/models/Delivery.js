const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');

const DeliverySchema = new mongoose.Schema({
    address: {
        type: String,
        trim: true,
        required: '"Адрес" это обязательное поле'
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