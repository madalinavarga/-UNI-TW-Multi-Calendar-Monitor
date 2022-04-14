var fs = require('fs');
var { getViewHTML, createUser, getViewRegister, getScriptRegister } = require('../controllers/registerController');


function register(req, res) {
    switch (req.url) {
        case "/register":
            switch (req.method) {
                case "GET":
                    getViewHTML(req, res);
                    break;
                case "POST":
                    createUser(req, res);
                    break;
                default:
                    res.write('method not allowed');

            }
            break;
        case "/script/register.js":
            getScriptRegister(req, res);
            break;
        case "/style/register.css":
            getViewRegister(req, res);
            break;
        default:
            res.write('page not found!'); //write a response to the client

    }
}

module.exports = {
    register: register
}