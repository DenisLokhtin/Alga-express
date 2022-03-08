const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PaymentSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        min: 0,
    },
    status: {
        type: Boolean,
        default: false,
    },
});

PaymentSchema.plugin(idValidator);

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
