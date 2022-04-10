var fs = require("fs");
// functions for routes requests

//GET
function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Login/login.html"));
}

function getViewLogin(req, res) {
    res.write(fs.readFileSync("./views/Login/style/login.css"));
}


//POST

module.exports = {
    getViewHTML: getViewHTML,
    getViewLogin: getViewLogin,
};