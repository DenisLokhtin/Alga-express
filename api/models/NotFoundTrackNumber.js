const mongoose = require('mongoose');

const NotFoundTrackNumberSchema = new mongoose.Schema({
    notFoundTrackNumber: {
        type: String,
        trim: true,
        required: 'Поле Трек-Номер обязательное',
    },

    status: {
        type: String,
        trim: true,
        enum: ['REGISTERED', 'ON_WAREHOUSE', 'ON_WAY', 'PROCESSED', 'DELIVERED', 'DONE'],
        default: 'REGISTERED',
    },
});

const NotFoundTrackNumber = mongoose.model('NotFoundTrackNumber', NotFoundTrackNumberSchema);

module.exports = NotFoundTrackNumber;