const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PackageSchema = new mongoose.Schema({
    trackNumber: {
        type: String,
        trim: true,
        unique: true,
        required: 'Поле Трек-Номер обязательное',
        validate: {
            validator: async trackNumber => {
                const uniqueTrackNumber = await Package.findOne({trackNumber});

                if (uniqueTrackNumber) return false;
            },
            message: 'Этот Трек-номер уже есть в базе!',
        },
    },

    title: {
        type: String,
        trim: true,
        required: 'Поле Название обязательное',
    },
    amount: {
        type: Number,
        required: 'Поле Количество обязательное',
        validate: {
            validator: Number.isInteger,
            message: 'Введите только целые числа',
        },
        min: [0, 'Количество не может быть отрицательным числом'],
    },
    price: {
        type: Number,
        required: 'Поле Цена обязательное',
        min: [0, 'Цена не может быть меньше нуля'],
    },
    priceCurrency: {
        type: String,
        trim: true,
        required: 'Поле Валюта обязательное',
        enum: ['USD', 'TRY', 'CNY'],
    },
    flight: {
        type: mongoose.Types.ObjectId,
        ref: 'Flight'
    },
    country: {
        type: String,
        trim: true,
        enum: ['usa', 'turkey', 'turkeyGround', 'china', 'chinaGround'],
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
        enum: ['REGISTERED', 'ON_WAREHOUSE', 'ON_WAY', 'DELIVERED', 'DONE', 'ERASED'],
        default: 'REGISTERED',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    cargoNumber: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: async trackNumber => {
                const uniqueTrackNumber = await Package.findOne({trackNumber});

                if (uniqueTrackNumber) return false;
            },
            message: 'Этот Карго-номер уже есть в базе!',
        },
    },
    cargoWeight: {
        type: Number,
        min: 0,
    },
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
    delivery: {
        type: Boolean,
        default: false
    }
});

PackageSchema.pre('save', function (next) {
    const packages = this;
    let numberPackage = '';
    Package.find({}, function (error, pack) {
        if (error) throw error;
        numberPackage = String(pack.length + 1);
        const loop = 6 - numberPackage.length;
        for (let i = 0; i < loop; i++) {
            numberPackage = 0 + numberPackage;
        }
        packages.cargoNumber = numberPackage;
        next();
    })
});

PackageSchema.plugin(idValidator);

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;