const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const {customAlphabet} = require("nanoid");


const nanoid = customAlphabet('1234567890', 8);


const PackageSchema = new mongoose.Schema({
    trackNumber: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Количество не может быть отрицательным числом'],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Цена не может быть меньше нуля'],
    },
    date_depart: Date,
    date_arrival: Date,
    country: {
        type: String,
        trim: true,
        enum: ['USA', 'Turkey', 'China'],
        required: true
    },
    width: {
        type: Number,
        min: [0, 'Ширина не может быть меньше нуля'],
    },
    length: {
        type: Number,
        min: [0, 'Длина не может быть меньше нуля'],
    },
    height: {
        type: Number,
        min: [0, 'Высота не может быть меньше нуля'],
    },
    status: {
        type: String,
        trim: true,
        enum: ['NEW', 'REGISTERED', 'ON_WAREHOUSE', 'ON_WAY', 'PROCESSED', 'ISSUE', 'ISSUED', 'ERASED'],
        default: 'REGISTERED',
    },
    deleted: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cargoNumber: {
        type: String,
        trim: true,
        default: () => nanoid(),
        unique: true
    },
    cargoPrice: {
        type: Number,
        min: [0],
    },
    urlPackage: {
        type: String,
        trim: true,
    },

});

PackageSchema.plugin(idValidator);

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;