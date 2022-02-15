const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');


const RequisitesSchema = new mongoose.Schema({
    bank: {
        type: String,
        unique: true,
        trim: true,
    },
    requisites: {
        type: String,
        required: true,
    },
});

RequisitesSchema.plugin(idValidator);

const Requisites = mongoose.model('Requisites', RequisitesSchema);

module.exports = Requisites;
