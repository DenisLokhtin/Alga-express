const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const TariffGroupSchema = new mongoose.Schema({
    usa: {
        type: Number,
        min: 0,
        default: 12,
    },
    turkey: {
        type: Number,
        min: 0,
        default: 4.3,
    },
    turkeyGround: {
        type: Number,
        min: 0,
        default: 3,
    },
    china: {
        type: Number,
        min: 0,
        default: 15,
    },
    chinaGround: {
        type: Number,
        min: 0,
        default: 5,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    }
});

TariffGroupSchema.plugin(idValidator);

const TariffGroup = mongoose.model('TariffGroup', TariffGroupSchema);

module.exports = TariffGroup;