'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let User = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    organizationName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

module.exports = Mongoose.model('user', User)