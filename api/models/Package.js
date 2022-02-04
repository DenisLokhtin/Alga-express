const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const {customAlphabet} = require("nanoid");

const nanoid = customAlphabet('1234567890', 8);

const PackageSchema = new mongoose.Schema({
    trackNumber: {
        type: String,
        trim: true,
        required: 'Поле Трек-Номер обязательное',
    },
    title: {
        type: String,
        trim: true,
        required: 'Поле Название обязательное',
    },
    amount: {
        type: Number,
        required: 'Поле Количество обязательное',
        min: [0, 'Количество не может быть отрицательным числом'],
    },
    price: {
        type: Number,
        required: 'Поле Цена обязательное',
        min: [0, 'Цена не может быть меньше нуля'],
    },
    flight: {
        type: mongoose.Types.ObjectId,
        ref: 'Flight'
    },
    country: {
        type: String,
        trim: true,
        enum: ['USA', 'Turkey', 'China', 'China_ground'],
        required: 'Поле Страна обязательное',
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
        enum: ['REGISTERED', 'ON_WAREHOUSE', 'ON_WAY', 'PROCESSED', 'DELIVERED', 'DONE', 'ERASED'],
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
        unique: true
    },
    cargoWeight: Number,
    cargoPrice: {
        type: Number,
        min: [0],
    },
    urlPackage: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },

});

PackageSchema.pre('save',  function (next) {
    const packages = this;
    Package.find({}, function (error, pack) {
        if (error) throw error;
        packages.cargoNumber = pack.length + 1;
        next();
    })
});

PackageSchema.plugin(idValidator);

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;