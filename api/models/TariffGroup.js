const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const TariffGroupSchema = new mongoose.Schema({
    new:
        {
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
        },

    advanced:
        {
            usa: {
                type: Number,
                min: 0,
                default: 11.5,
            },
            turkey: {
                type: Number,
                min: 0,
                default: 4.2,
            },
            turkeyGround: {
                type: Number,
                min: 0,
                default: 2.5,
            },
            china: {
                type: Number,
                min: 0,
                default: 14.5,
            },
            chinaGround: {
                type: Number,
                min: 0,
                default: 4.5,
            },

        },

    buyers:
        {
            usa: {
                type: Number,
                min: 0,
                default: 11,
            },
            turkey: {
                type: Number,
                min: 0,
                default: 4,
            },
            turkeyGround: {
                type: Number,
                min: 0,
                default: 2,
            },
            china: {
                type: Number,
                min: 0,
                default: 14,
            },
            chinaGround: {
                type: Number,
                min: 0,
                default: 4,
            },
        },
});

TariffGroupSchema.plugin(idValidator);

const TariffGroup = mongoose.model('TariffGroup', TariffGroupSchema);

module.exports = TariffGroup;