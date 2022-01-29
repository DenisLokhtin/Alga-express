const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PaymentSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
    },
    image: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

PaymentSchema.plugin(idValidator);

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
