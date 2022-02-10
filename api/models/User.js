const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require("nanoid");

const SALT_WORK_FACTOR = 10;

const validateUnique = async value => {
    const user = await User.findOne({email: value});
    if (user) return false;
};

const validateEmail = value => {
    const re = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,})$/;
    if (!re.test(value)) return false;
};

const phoneNumbers = new mongoose.Schema({
    number: String,
    type: {
        type: String,
        trim: true,
        enum: ['TELEGRAM', 'PHONE'],
        default: 'PHONE',
    },
    idChat: {
        type: String,
        trim: true,
    }
});

const imagePassport = new mongoose.Schema({
    image: {
        type: String,
        trim: true
    }
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [
            {validator: validateEmail, message: 'Email is not valid!'},
            {validator: validateUnique, message: 'This user is already registered!'}
        ],
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    avatar: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
    passport: [imagePassport],
    phone: [phoneNumbers],
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;