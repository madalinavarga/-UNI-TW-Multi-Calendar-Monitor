var fs = require("fs");
var jwt = require('jsonwebtoken');
var { checkUser, findUserByEmail } = require("../model/user")

//GET
function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Login/login.html"));
}

//POST
async function loginUser(req, res) {
    return await new Promise((resolve) => {
        let body = '';

        req.on('data', function(data) {
            body += data;
        });

        req.on('end', async function() {
            const data = JSON.parse(body)
            try {
                const userExists = await checkUser(data.email, data.password)
                if (userExists) {
                    const user = await findUserByEmail(data.email)
                    const token = jwt.sign({ user }, 'student');
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(200)
                    res.write(token)
                } else
                    res.writeHead(400)
            } catch (error) {
                console.log(error)
                res.writeHead(500)
            } finally {
                resolve() //continue, no more await
            }
        });
    })
}

module.exports = {
    getViewHTML,
    loginUser
};