let { loginValidation, emailValidation } = require('../config/validation');
let db = require('../dbConnect');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

module.exports = {
    loginUser: async (req, res) => {
        // login
        // validate user
        await emailValidation(req.body.email,async function(user) {
            // we give status as username or password is wrong, to avoid user enumeration
            if (!user) return res.status(400).send('username or password is wrong');
            // validate pass
            const validPass = await bcrypt.compare(req.body.password, user.password);
            
            if (!validPass) return res.status(400).send('Invalid password');
            
            // console.log('uuuu',process.env.TOKEN_SECRET)
            // res.send('Logged In!');
            const token = jwt.sign({user: user}, 'sfwelksafe');
            res.header('auth-token', token).send({status: "success", token: token});
        });
    }
}
