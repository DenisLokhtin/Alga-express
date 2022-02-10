const mongoose = require('mongoose');

const WareHouseSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    region: String,
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
});


const WareHouse = mongoose.model('WareHouse', WareHouseSchema);
module.exports = WareHouse;