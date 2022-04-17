var fs = require('fs');
var { getViewHTML, getViewLogin, getScriptLogin } = require('../controllers/loginController')

function login(req, res) {
    switch (req.url) {
        case "/login":
            switch (req.method) {
                case "GET":
                    getViewHTML(req, res);
                    break;
                default:
                    res.write('method not allowed');
            }
            break;

        case "/style/login.css":
            switch (req.method) {
                case "GET":
                    getViewLogin(req, res);
                    break;
                default:
                    res.write('method not allowed');
            }
            break;
        case "/script/login.js":
            getScriptLogin(req, res);
            break;
        default:
            res.write('page not found!'); //write a response to the client

    }
}

module.exports = {
    login: login
}