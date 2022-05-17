const fs = require('fs');
const { getViewHTML, registerUser } = require('../controllers/registerController');


async function register(req, res) {
    switch (req.method) {
        case "GET":
            getViewHTML(req, res);
            break;
        case "POST":
            await registerUser(req, res);
            break;
        default:
            res.write('method not allowed');

    }
}

module.exports = {
    register: register
}