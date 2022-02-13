const mongoose = require('mongoose');

const WareHouseSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
});


const WareHouse = mongoose.model('WareHouse', WareHouseSchema);
module.exports = WareHouse;