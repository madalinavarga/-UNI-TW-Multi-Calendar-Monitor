var fs = require('fs');
// functions for routes requests

//GET 
function getViewHTML(req, res) {
    res.write(fs.readFileSync('./views/login.html'));
}

function getViewLogin(req, res) {
    res.write(fs.readFileSync('./public/login.css'));
}



//POST




module.exports = {
    getViewHTML: getViewHTML,
    getViewLogin: getViewLogin
}