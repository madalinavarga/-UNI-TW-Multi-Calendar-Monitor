const fs = require("fs");
const { UserRequest, createUser } = require("../model/user")

//routes
function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Register/register.html"));
}

function getViewRegister(req, res) {
    res.write(fs.readFileSync("./views/Register/style/register.css"));
}

function getScriptRegister(req, res) {
    res.write(fs.readFileSync('./views/Register/script/register.js'));
}

//logic function

async function registerUser(req, res) {
    return await new Promise((resolve) => {
        let body = '';

        req.on('data', function(data) {
            body += data;
        });

        req.on('end', async function() {
            const data = JSON.parse(body)
            const request = new UserRequest(data.firstName, data.lastName, data.email, data.password)
            createUser(request)
                .then(() => {
                    res.writeHead(201)
                })
                .catch(() => {
                    res.writeHead(500)
                })
                .finally(() => {
                    resolve()
                })
        });
    })
}


module.exports = {
    getViewHTML,
    registerUser,
    getViewRegister,
    getScriptRegister
};