var fs = require('fs');
var { getViewHTML, createUser } = require('../controllers/registerController');


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
            res.write(fs.readFileSync('./views/Register/script/register.js'));
            break;
        case "/public/layout.css":
            res.write(fs.readFileSync('./public/layout.css'));
            break;
        case "/public/register.css":
            res.write(fs.readFileSync('./public/register.css'));
            break;
        default:
            res.write('page not found!'); //write a response to the client

    }
}

module.exports = {
    register: register
}