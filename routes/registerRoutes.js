var fs = require('fs');
var { getView } = require('../controllers/registerController');


function register(req, res) {
    switch (req.url) {
        case "/register":
            switch (req.method) {
                case "GET":
                    getView(req, res);
                    break;
                default:
                    res.write('method not allowed');
            }
            break;
        case "/public/register.js":
            res.write(fs.readFileSync('./public/register.js'));
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