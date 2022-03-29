var fs = require('fs');
var { getView } = require('../controllers/loginController')

function login(req, res) {
    switch (req.url) {
        case "/login":
            switch (req.method) {
                case "GET":
                    getView(req, res);
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
        case "/public/layout.css":
            res.write(fs.readFileSync('./public/layout.css'));
            break;
        case "/public/login.css":
            res.write(fs.readFileSync('./public/login.css'));
            break;
        default:
            res.write('page not found!'); //write a response to the client

    }
}

module.exports = {
    login: login
}