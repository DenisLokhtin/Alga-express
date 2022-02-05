const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        trim: true,
    },
    depart_date: {
        type: Date,
        trim: true,
    },
    arrived_date: {
        type: Date,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
        default: "ACTIVE",
        enum: ["ACTIVE", "DONE"],
    },
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;