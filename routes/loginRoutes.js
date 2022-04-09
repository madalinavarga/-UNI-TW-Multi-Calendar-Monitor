var fs = require('fs');
var { getViewHTML, getViewLayout, getViewLogin } = require('../controllers/loginController')

function login(req, res) {
    switch (req.url) {
        case "/login":
            switch (req.method) {
                case "GET":
                    getViewHTML(req, res);
                    break;
                case "POST":
                    res.write('verific cont ');
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.write(html);
                    break;
                default:
                    res.write('method not allowed');
            }
            break;

        case "/style/style.css":
            switch (req.method) {
                case "GET":
                    getViewLogin(req, res);
                    break;
                default:
                    res.write('method not allowed');
            }
        default:
            res.write('page not found!'); //write a response to the client

    }
}

module.exports = {
    login: login
}