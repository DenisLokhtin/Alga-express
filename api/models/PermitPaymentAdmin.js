const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PermitPaymentSchema = new mongoose.Schema({
    check: {
        type: Number,
        required: true,
        min: 0,
    },
    userPayment: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    checkNumber: {
        type: Number,
        default: 0,
        required: true,
    }
});

PermitPaymentSchema.pre('save',  function (next) {
        const permit = this;
    PermitPayment.find({}, function (error, payment) {
        if (error) throw error;
        permit.checkNumber = payment.length + 1;
        next();
    })
});

PermitPaymentSchema.plugin(idValidator);


    const PermitPayment = mongoose.model('PermitPayment', PermitPaymentSchema);

    module.exports = PermitPayment;