const Joi = require('joi');
// const db = require('../dbConnect');
const userModel = require('../model/user.model');

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(4).required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

const registerValidation = data => {
    const schema = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        organization: Joi.string().min(3).required(),
        email: Joi.string().min(4).required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

async function emailValidation(email, cb) {
    return await userModel.find({ emailId: email })
    .then(data => {
        // console.log(data)
        if (data.length > 0) {
            cb(data[0])
        } else {
            cb(false);
        }
    })
    .catch(err => {
        console.log(err);
        cb(false);
    });
}

module.exports = {
    loginValidation: loginValidation,
    registerValidation: registerValidation,
    emailValidation: emailValidation
}