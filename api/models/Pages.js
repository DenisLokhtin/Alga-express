const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');


const PagesSchema = new mongoose.Schema({
    nameURL: {
        type: String,
        unique: true,
        trim: true,
    },
    text: {
        type: String,
        required: true,
    },
});

PagesSchema.plugin(idValidator);

const Pages = mongoose.model('Pages', PagesSchema);

module.exports = Pages;
