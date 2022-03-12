const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');


const InformationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
    },
    text: {
        type: String,
        required: true,
    },
});

InformationSchema.plugin(idValidator);

const Information = mongoose.model('Information', InformationSchema);

module.exports = Information;
