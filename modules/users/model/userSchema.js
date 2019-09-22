const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    name: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: moment.utc().toDate()
    },
});

module.exports = mongoose.model('User', UserSchema);