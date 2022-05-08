const fs = require("fs");
const { UserRequest, createUser } = require("../model/user")

//routes
function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Register/register.html"));
}

async function registerUser(req, res) {
    return await new Promise((resolve) => {
        let body = '';

        req.on('data', function(data) {
            body += data;
        });

        req.on('end', async function() {
            const data = JSON.parse(body)
            const request = new UserRequest(data.firstName, data.lastName, data.email, data.password)
            try {
                await createUser(request)
                res.writeHead(201)
            } catch {
                res.writeHead(500)
            } finally {
                resolve() //continue, no more await
            }
        });
    })
}


module.exports = {
    getViewHTML,
    registerUser,
};