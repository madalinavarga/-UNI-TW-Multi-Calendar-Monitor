var fs = require("fs");

function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Register/register.html"));
}

const users = []

function createUser(req, res) {
    var body = '';

    req.on('data', function(data) {
        body += data;
    });

    req.on('end', function() {
        console.log(body, users)
        users.push(JSON.parse(body))
        res.writeHead(201)
    });
}

module.exports = {
    getViewHTML: getViewHTML,
    createUser: createUser
};