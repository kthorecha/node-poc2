// const { registerValidation, emailValidation } = require('../config/validation');
// let db = require('../dbConnect');
const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');

module.exports = {
    create: async (req, res) => {
        // create user
        let {firstname, lastname, organization, email, password } = req.body;
        console.log(email)
        // if (emailExists === false) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.log(err);
                bcrypt.hash(password, salt, (err2, hash) => {
                    if (err2) console.log(err2);
                    req.body.password = hash;
                    let saveUser = new userModel(req.body);
                    saveUser.save().then(resp =>{
                        console.log(resp);
                        res.status(200).send({status: "success", result: resp});
                    }).catch(err => {
                        console.log(err);
                        res.status(400).send({status: "error", error: err});
                    })
                });
            });
    },
    getAll: async (req, res) => {
        // get all
        userModel.find()
        .then(resp => {
            res.status(200).send({ status: "success", result: resp });
        })
        .catch(err => {
            res.status(400).send({ status: "error", error: err });
        })
    }
}