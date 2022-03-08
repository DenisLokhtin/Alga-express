const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
});


const Carousel = mongoose.model('Carousel', CarouselSchema);
module.exports = Carousel;