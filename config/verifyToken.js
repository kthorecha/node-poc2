const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token') || req.query.token;
    if (!token) return res.redirect('/login');

    try {
        const verified = jwt.verify(token, 'sfwelksafe');
        delete verified.user.password;
        req.user = verified.user;
        next();
    } catch (e) {
        console.log(e);
        res.status(400).send("Invalid token")
    }
}