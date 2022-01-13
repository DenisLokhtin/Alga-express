const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

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
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    date_depart: Date,
    date_arrival: Date,
    country: {
        type: String,
        enum: ['USA', 'Turkey', 'China'],
        required: true
    },
    width: {
     type: Number,
     min: 0,
    },
    length: {
        type: Number,
        min: 0,
    },
    height: {
        type: Number,
        min: 0,
    },
    status: {
        type: String,
        trim: true,
        enum: ['NEW', 'REGISTERED', 'ON_WAREHOUSE', 'ON_WAY', 'PROCESSED', 'ISSUE', 'ISSUED'],
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
    }
});

PackageSchema.plugin(idValidator);

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;