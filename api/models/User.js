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
            {validator: validateUnique, message: 'Этот пользователь уже зарегистрирован'}
        ],
    },
    password: {
        type: String,
        required: 'Это поле является обязательным и не должен содержать пробелы',
        trim: true,
        validate: {
            validator: function (value) {
                if (value.length < 8) return false
            },
            message: 'Пароль не должен быть меньше чем 8 символов',
        }
    },
    resetCode:{
        type: String,
        trim: true,
        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: '1m' },
        },
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
        enum: ['admin', 'user', 'warehouseman', 'superAdmin'],
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
    },
    passport: [imagePassport],
    phone: [phoneNumbers],
    tariff: {
        usa: {
            type: Number,
            min: 0,
            default: 0,
        },
        turkey: {
            type: Number,
            min: 0,
            default: 0,
        },
        turkeyGround: {
            type: Number,
            min: 0,
            default: 0,
        },
        china: {
            type: Number,
            min: 0,
            default: 0,
        },
        chinaGround: {
            type: Number,
            min: 0,
            default: 0,
        },
    },
    group: {
        type: String,
        trim: true,
        enum: ['NEW', 'BUYERS', "ADVANCED", 'SPECIAL'],
        default: "NEW",
    },
    notification: Boolean,
});

// UserSchema.index( { "resetCode": 1 }, { expireAfterSeconds: 30 } );

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);


    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret,) => {
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