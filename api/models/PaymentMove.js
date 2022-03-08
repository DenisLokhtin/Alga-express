const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');

const PaymentMoveSchema = new mongoose.Schema({
    //Поле для привязки пополнения балансма пользователем.
    userPayment: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
    },
    //Дата создания пеенещения средств
    date: {
        type: Date,
        default: Date.now,
    },
    //Подтверждение оплаты админом
    permitPayment: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    //Пополнение на сумму ...
    replenish: {
        type: Number,
        min: 0,
        default: 0,
    },
    //Списываение средств на сумму...
    debit_amount: {
        type: Number,
        min:0,
        default: 0,
    },
    //Привязывание, что именно списывается с балланса
    debit: mongoose.Types.ObjectId,
    lastBalance: {
        type: Number,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    //вид финансовой операции.
    status: {
        type: String,
        trim: true,
        enum: ['DEBIT', 'REPLENISH', 'REPLENISH_EDIT', 'REPLENISH_CASH', 'REPLENISH_CASH_EDIT', 'CANCELED'],
    }
});

PaymentMoveSchema.plugin(idValidator);
const PaymentMove = mongoose.model('PaymentMove', PaymentMoveSchema);

module.exports = PaymentMove;