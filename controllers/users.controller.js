const { registerValidation, emailValidation } = require('../config/validation');
let db = require('../dbConnect');
const bcrypt = require('bcryptjs');

module.exports = {
    create: async (req, res) => {
        // create user
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send({ status: "error", error: error.details[0].message });
        let {firstname, lastname, organization, email, password } = req.body;
console.log(email)
        let emailExists = emailValidation(email);
        console.log('eeee', emailExists)
        // if (emailExists === false) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.log(err);
                bcrypt.hash(password, salt, (err2, hash) => {
                    if (err2) console.log(err2);
                    let sql = `INSERT INTO users (firstname,lastname,organization,email,password) VALUES (?,?,?,?,?)`;
                    db.query(sql, [firstname, lastname, organization, email, hash], (err, result) => {
                        if (err) throw new Error(err);
                        res.status(200).send({ status: "success", result: result});
                    })
                });
            });
        // } else {
        //     res.status(400).send({ status: "error", error: "Email already exists"})
        // }
        // console.log(firstname,lastname,organization,email,password)
    },
    getAll: async (req, res) => {
        // get all
        let limit = req.query.limit ? `LIMIT ${req.query.limit}` : '';
        let offset = req.query.offset ? `OFFSET ${req.query.offset}` : '';
        let whereQuery = '';
        if (req.query.firstname) whereQuery = `WHERE firstname = '${req.query.firstname}'`;
        if (req.query.lastname) whereQuery = `WHERE lastname = '${req.query.lastname}'`;
        if (req.query.email) whereQuery = `WHERE email LIKE '%${req.query.email}%'`;
        if (req.query.employeeId) whereQuery = `WHERE employeeId = '${req.query.employeeId}'`;
        if (req.query.organization) whereQuery = `WHERE organization = '${req.query.organization}'`;
        let sql = `SELECT * FROM users ${whereQuery} ${limit} ${offset}`;
        db.query(sql, function(err, result) {
            if (err) console.log(err);
            // console.log(result)
            res.status(200).send({ status: "success", result: result});
        })
    },
    update: async (req, res) => {
        // update
        let sql = 'UPDATE users SET ? WHERE ?';
        db.query(sql, [req.body, req.params], function (err, result) {
            if (err) res.status(400).send({ status: "error", error: err});
            res.status(200).send({ status: "success", result: result });
        })
    },
    delete: async (req, res) => {
        // delete
        if (req.params.id) {
            let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
            db.query(sql, function (err, result) {
                if (err) res.status(400).send({ status: "error", error: "Error while updating details!"});
                res.status(200).send({ status: "success", result: result });
            })

        } else {
            res.status(400).send({ status: "error", error: "Please provide an id to delete record"});
        }
    }
}