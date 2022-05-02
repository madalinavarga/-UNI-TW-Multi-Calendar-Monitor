var fs = require("fs");
// functions for routes requests

//GET
function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Login/login.html"));
}

function getViewLogin(req, res) {
    res.write(fs.readFileSync("./views/Login/style/login.css"));
}

function getScriptLogin(req, res) {
    res.write(fs.readFileSync('./views/Login/script/login.js'));
}

//POST
const users = []

function checkUser(req, res) {
    let body = '';

    req.on('data', function(data) {
        body += data;
    });

    req.on('end', function() {
        //verific aici?
        res.writeHead(201)
    });
}
module.exports = {
    getViewHTML,
    getViewLogin,
    getScriptLogin,
    checkUser
};