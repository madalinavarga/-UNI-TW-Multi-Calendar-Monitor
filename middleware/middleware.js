const jwt = require('jsonwebtoken');

function middleware(req, res, next) {
    try {
        const token = req.headers.authorization.split("Bearer ")[1]
        const user = jwt.verify(token, 'student');
        console.log("Request de la userul: ", user)
        req.user = user;
        next(req, res); // controller dat ca parametru
    } catch (err) {
        console.log(err)
        res.writeHead(500);
        res.write("not allowed");
    }
}

module.exports = {
    middleware
}