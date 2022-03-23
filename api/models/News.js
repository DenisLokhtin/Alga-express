const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Название является обязательным полем',
    },

    description: {
        type: String,
    },

    image: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },

    deleted: {
        type: Boolean,
        default: false
    },
});


const News = mongoose.model('News', NewsSchema);
module.exports = News;