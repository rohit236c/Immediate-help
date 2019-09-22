const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const medicalPersonSchema = new Schema({
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
    id_number: {
        type: String,
    },
    id_type: {
        type: String
    },
    medical_certificate_number: {
        type: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    police_verification_number: {
        type: String
    },
    created_at: {
        type: Date,
        default: moment.utc().toDate()
    },
});

module.exports = mongoose.model('medical_person', medicalPersonSchema);