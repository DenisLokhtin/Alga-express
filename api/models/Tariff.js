const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const TariffSchema = new mongoose.Schema({
    usa: {
        type: Number,
        min: [0],
        default: 12,
    },
    turkey: {
        type: Number,
        min: [0],
        default: 4.8,
    },
    china: {
        type: Number,
        min: [0],
        default: 14,
    },

    group: {
        type: String,
        trim: true,
        enum: ['NEW', 'BUYERS', "ADVANCED", 'SPECIAL'],
        default: "NEW",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

});

TariffSchema.plugin(idValidator);

const Tariff = mongoose.model('Tariff', TariffSchema);

module.exports = Tariff;