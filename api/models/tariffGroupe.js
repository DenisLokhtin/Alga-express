const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const TariffGroupSchema = new mongoose.Schema({

    new:
        {
            usa: {
                type: Number,
                min: [0],
                required: true,
            },
            turkey: {
                type: Number,
                min: [0],
                required: true,
            },
            china: {
                type: Number,
                min: [0],
                required: true,
            },
        },
    advanced:
        {
            usa: {
                type: Number,
                min: [0],
            },
            turkey: {
                type: Number,
                min: [0],
            },
            china: {
                type: Number,
                min: [0],
                required: true,
            },
            chinaGround: {
                type: Number,
                min: [0],
                required: true,
            },

        },
    buyers:
        {
            usa: {
                type: Number,
                min: [0],
            },
            turkey: {
                type: Number,
                min: [0],
                required: true,
            },
            china: {
                type: Number,
                min: [0],
                required: true,
            },chinaGround: {
                type: Number,
                min: [0],
                required: true,
            },
        },
    special:
        {
            usa: {
                type: Number,
                min: [0],
            },
            turkey: {
                type: Number,
                min: [0],
            },
            china: {
                type: Number,
                min: [0],
            },chinaGround: {
                type: Number,
                min: [0],
            },
        },
});

TariffGroupSchema.plugin(idValidator);

const TariffGroup = mongoose.model('TariffGroup', TariffGroupSchema);

module.exports = TariffGroup;